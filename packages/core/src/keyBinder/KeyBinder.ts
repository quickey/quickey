import { every, lc } from "shared/utils";
import { CombinationType } from "./enums";
import { IKeyBindCombination, IKeyBinderOptions, IKeyRecordParams } from "./interfaces";
import { SPECIAL_EVENT_KEY_MAP } from "./constants";
import { prepareCombination } from "./utils";

export interface IKeyBinderDelegate {
    didMatchFound: (binder: KeyBinder, combinations: IKeyBindCombination[]) => void;
}

export default class KeyBinder {
    private readonly _combinations: IKeyBindCombination[];
    private _isRecording: boolean;
    private _keysRecord: Map<string, IKeyRecordParams>;
    public delegate: IKeyBinderDelegate;

    constructor(options: IKeyBinderOptions = {}) {
        const {
            combinations = [],
            autoPlay = true
        } = options;

        this._keysRecord = new Map();
        this._onDocumentKeyDown = this._onDocumentKeyDown.bind(this);
        this._onDocumentKeyUp = this._onDocumentKeyUp.bind(this);
        this._combinations = combinations.map(prepareCombination);

        if (autoPlay) {
            this.record();
        }
    }

    public record() {
        if (this._isRecording) {
            return;
        }

        document.addEventListener("keydown", this._onDocumentKeyDown, { passive: true });
        document.addEventListener("keyup", this._onDocumentKeyUp, { passive: true });
        this._isRecording = true;
    }

    public pause() {
        document.removeEventListener("keydown", this._onDocumentKeyDown);
        document.removeEventListener("keyup", this._onDocumentKeyUp);
        this._isRecording = false;
    }

    public add(combination: IKeyBindCombination) {
        this._combinations.push(prepareCombination(combination));
    }

    public remove(combinationOrCombinationId: IKeyBindCombination | string) {
        if (typeof combinationOrCombinationId === "string") {
            combinationOrCombinationId = this._getCombinationById(combinationOrCombinationId);
        }

        this._combinations.splice(this._combinations.indexOf(combinationOrCombinationId), 1);
    }

    public removeAll() {
        this._combinations.length = 0;
    }

    private _getCombinationById(combinationId: string) {
        return this._combinations.find((combination) => combination.id === combinationId);
    }

    private _recordKey(e: KeyboardEvent) {
        const key = lc(e.key);
        if (!this._keysRecord.has(key)) {
            this._keysRecord.set(key, {
                key,
                code: e.which || e.keyCode
            });
        }
    }

    private _deleteKeyFromRecord(e: KeyboardEvent) {
        this._keysRecord.delete(lc(e.key));
    }

    private _onDocumentKeyDown(e: KeyboardEvent) {
        if (this._keysRecord.has(lc(e.key))) {
            return;
        }

        this._recordKey(e);

        const matches: IKeyBindCombination[] =
            this._combinations.filter((combination: IKeyBindCombination) =>
                this._checkCombination(e, combination));

        if (matches.length && this.delegate) {
            this.delegate.didMatchFound(this, matches);
        }
    }

    private _onDocumentKeyUp(e: KeyboardEvent) {
        this._deleteKeyFromRecord(e);
    }

    private _checkCombination(event: KeyboardEvent, combination: IKeyBindCombination): boolean {
        switch (combination.type) {
            case CombinationType.Connection:
                return this._checkConnectionCombination(event, combination);
            case CombinationType.Sequence:
                return this._checkSequenceCombination(event, combination);
        }

        return false;
    }

    private _checkConnectionCombination(event: KeyboardEvent, combination: IKeyBindCombination): boolean {
        return every<boolean>([

            this._keysRecord.size > 1,

            every<string>(combination.parts, (key) => this._isRecordedKey(key)),

            combination.strict
                ? this._keysRecord.size === combination.parts.length
                : true
        ]);
    }

    private _checkSequenceCombination(event: KeyboardEvent, combination: IKeyBindCombination): boolean {
        const sequenceParts = combination.parts;
        const isMatchKey = this._isEventMatchKey(event, sequenceParts[combination.sequence]);

        if (isMatchKey) {
            if (combination.sequence === sequenceParts.length - 1) {
                this._resetCombination(combination);
                return combination.strict
                    ? this._keysRecord.size === 1
                    : true;
            }

            combination.sequence++;

            window.clearTimeout(combination.sequenceTimer);

            combination.sequenceTimer = setTimeout(() => {
                this._resetCombination(combination);
            }, combination.delay);
        } else {
            this._resetCombination(combination);
        }

        return false;
    }

    private _resetCombination(combination: IKeyBindCombination) {
        window.clearTimeout(combination.sequenceTimer);
        combination.sequenceTimer = null;
        combination.sequence = 0;
    }

    private _isEventMatchKey(event: KeyboardEvent, key: string): boolean {
        const specialEventKey = SPECIAL_EVENT_KEY_MAP[key];

        return specialEventKey
            ? event.key === specialEventKey
            : key.charCodeAt(0) === event.which;
    }

    private _isRecordedKey(key: string): boolean {
        key = lc(SPECIAL_EVENT_KEY_MAP[key] || key);

        return this._keysRecord.has(key);
    }

    public destroy() {
        this.pause();
    }
}