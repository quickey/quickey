import { guid } from "shared/utils";
import KeyBinder, { IKeyBinderDelegate, IKeyBindCombination } from "./keyBinder";

export type ActionCallback = (combination?: IKeyBindCombination) => void;

export interface IQuickeyAction {
    id?: string;
    keys: string;
    delay?: number;
    strict?: boolean;
    description?: string;
    callback: ActionCallback;
}

export interface IQuickeyOptions {
    actions?: IQuickeyAction[];
}

export default class Quickey implements IKeyBinderDelegate {

    private _keyBinder: KeyBinder;
    private _callbacks: { [index: string]: ActionCallback; }

    constructor(options: IQuickeyOptions) {
        options.actions = options.actions || [];
        this._callbacks = {};
        this._keyBinder = new KeyBinder();
        this._keyBinder.delegate = this;

        options.actions.map(this.addAction);
    }

    public addAction = (actionOrActions: IQuickeyAction | IQuickeyAction[]) => {
        if (!(actionOrActions instanceof Array)) {
            actionOrActions = [actionOrActions];
        }

        for (const action of actionOrActions) {
            const id = action.id || guid();
            const { keys, delay, strict } = action;

            this._addActionListener(id, action.callback);

            this._keyBinder.add({
                id,
                keys,
                delay,
                strict
            });
        }

        return this;
    }

    public removeAction(actionId: string) {
        this._removeActionListener(actionId);
        this._keyBinder.remove(actionId);

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
            const action = this._callbacks[combination.id];
            action && action(combination);
        }
    }

    private _addActionListener(actionId: string, callback: ActionCallback) {
        this._callbacks[actionId] = callback;
    }

    private _removeActionListener(actionId: string) {
        delete this._callbacks[actionId];
    }
}