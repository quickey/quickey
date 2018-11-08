import { Keyboard, keyboard, IKeyboardInput } from "@quickey/keyboard";
import { every, lc } from "@quickey/shared/lib/utils";
import { CombinationType } from "./enums";
import { IKeyBindCombination, IKeyBinderOptions } from "./interfaces";
import { SPECIAL_EVENT_KEY_MAP } from "./constants";
import { prepareCombination } from "./utils";

export interface IKeyBinderDelegate {
    didMatchFound: (binder: KeyBinder, combinations: IKeyBindCombination[], target: EventTarget) => void;
}

export default class KeyBinder {
    public delegate: IKeyBinderDelegate;
    private _keyboard: Keyboard;
    private _paused: boolean;
    private readonly _combinations: Map<string, IKeyBindCombination>;

    constructor(options: IKeyBinderOptions = {}) {
        const {
            combinations = [],
            autoPlay = true,
            target
        } = options;

        this._keyboard = (target && target instanceof EventTarget) ? new Keyboard(target) : keyboard;
        this._combinations = new Map();
        this._paused = true;

        combinations.map(this.bind);

        if (autoPlay) {
            this.play();
        }
    }

    public get paused(): boolean {
        return this._paused;
    }

    public play() {
        this._keyboard.getStream("keydown").pipe(this._onKeyboardKeyDown);
        this._paused = false;
    }

    public pause() {
        this._keyboard.getStream("keydown").unpipe(this._onKeyboardKeyDown);
        this._paused = true;
    }

    public bind = (combination: IKeyBindCombination) => {
        combination = prepareCombination(combination);
        this._combinations.set(combination.id, combination);
    }

    public unbind(combinationId: string) {
        this._combinations.delete(combinationId);
    }

    public removeAll() {
        this._combinations.clear();
    }

    private _onKeyboardKeyDown = (input: IKeyboardInput) => {
        const matches: IKeyBindCombination[] =
            Array.from(this._combinations.entries())
                .map(([key, combination]) => combination)
                .filter((combination) => this._checkCombination(input, combination));

        if (matches.length && this.delegate) {
            this.delegate.didMatchFound(this, matches, this._keyboard.target);
        }
    }

    private _checkCombination(input: IKeyboardInput, combination: IKeyBindCombination): boolean {
        switch (combination.type) {
            case CombinationType.Connection:
                return this._checkConnectionCombination(input, combination);
            case CombinationType.Sequence:
                return this._checkSequenceCombination(input, combination);
        }

        return false;
    }

    private _checkConnectionCombination(input: IKeyboardInput, combination: IKeyBindCombination): boolean {
        return every<boolean>([

            this._keyboard.activeKeys > 1,

            every<string>(combination.parts, (key) => this._isActiveKey(key)),

            combination.strict
                ? this._keyboard.activeKeys === combination.parts.length
                : true
        ]);
    }

    private _checkSequenceCombination(input: IKeyboardInput, combination: IKeyBindCombination): boolean {
        const sequenceParts = combination.parts;
        const isMatchKey = this._isInputMatchKey(input, sequenceParts[combination.sequence]);

        if (isMatchKey) {
            if (combination.sequence === sequenceParts.length - 1) {
                this._resetCombination(combination);
                return combination.strict
                    ? this._keyboard.activeKeys === 1
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

    private _isInputMatchKey(input: IKeyboardInput, key: string): boolean {
        const specialEventKey = lc(SPECIAL_EVENT_KEY_MAP[key]);

        return specialEventKey
            ? input.key === specialEventKey
            : key.charCodeAt(0) === input.code;
    }

    private _isActiveKey(key: string): boolean {
        key = lc(SPECIAL_EVENT_KEY_MAP[key] || key);

        return this._keyboard.isKeyActive(key);
    }

    public destroy() {
        this.pause();
        this.removeAll();

        if (this._keyboard !== keyboard) {
            this._keyboard.destroy();
        }
    }
}