import { guid } from "@quickey/shared/lib/utils";
import { KeyBinder, IKeyBinderDelegate, IKeyBindCombination } from "@quickey/binder";

export type ActionCallback = (combination?: IKeyBindCombination) => void;
export type OnDestroyCallback = (quickey: Quickey) => void;

export interface IQuickeyAction {
    id?: string;
    keys: string;
    delay?: number;
    strict?: boolean;
    description?: string;
    callback: ActionCallback;
}

export interface IQuickeyOptions {
    title?: string;
    description?: string;
    actions?: IQuickeyAction[];
    onDestroy?: OnDestroyCallback;
}

export default class Quickey implements IKeyBinderDelegate {
    private _keyBinder: KeyBinder;
    private _callbacks: Map<string, ActionCallback>;
    private _onDestroy: OnDestroyCallback;
    private _title: string;
    private _description: string;

    constructor(options: IQuickeyOptions = {}) {
        options.actions = options.actions || [];

        this._callbacks = new Map();
        this._title = options.title;
        this._description = options.description;
        this._keyBinder = new KeyBinder();
        this._keyBinder.delegate = this;
        this._onDestroy = options.onDestroy;

        options.actions.map(this.addAction);
    }

    public get title(): string {
        return this._title;
    }

    public get description(): string {
        return this._description;
    }

    public addAction = (actionOrActions: IQuickeyAction | IQuickeyAction[]) => {
        if (!(actionOrActions instanceof Array)) {
            actionOrActions = [actionOrActions];
        }

        for (const action of actionOrActions) {
            const id = action.id || guid();
            const { keys, delay, strict } = action;

            this._addActionListener(id, action.callback);

            this._keyBinder.bind({
                id,
                keys,
                delay,
                strict
            });
        }

        return this;
    }

    public play() {
        this._keyBinder.play();
    }

    public pause() {
        this._keyBinder.pause();
    }

    public destroy() {
        this._keyBinder.destroy();
        this._onDestroy && this._onDestroy(this);
    }

    public removeAction(actionId: string) {
        this._removeActionListener(actionId);
        this._keyBinder.unbind(actionId);

        return this;
    }

    public removeAllActions() {
        this._keyBinder.removeAll();

        return this;
    }

    /**
     * IKeyBinderDelegate matched combination callback
     *
     * @param {KeyBinder} binder
     * @param {IKeyBindCombination[]} combinations
     * @memberof Quickey
     */
    public didMatchFound(binder: KeyBinder, combinations: IKeyBindCombination[]) {
        for (const combination of combinations) {
            const action = this._callbacks.get(combination.id);
            action && action(combination);
        }
    }

    private _addActionListener(actionId: string, callback: ActionCallback) {
        this._callbacks.set(actionId, callback);
    }

    private _removeActionListener(actionId: string) {
        this._callbacks.delete(actionId);
    }
}