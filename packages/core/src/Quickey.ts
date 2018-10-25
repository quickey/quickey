import { guid } from "@quickey/shared/lib/utils";
import { KeyBinder, IKeyBinderDelegate, IKeyBindCombination } from "@quickey/binder";

export type ActionCallback = (combination?: IKeyBindCombination) => void;
export type OnDestroyCallback = (quickey: Quickey) => void;

interface IAction {
    id?: string;
    keys: string;
    description?: string;
    callback: ActionCallback;
}

export interface IQuickeyActionOptions extends IAction {
    delay?: number;
    strict?: boolean;
}

export interface IQuickeyOptions {
    title?: string;
    description?: string;
    actions?: IQuickeyActionOptions[];
    onDestroy?: OnDestroyCallback;
}

export default class Quickey implements IKeyBinderDelegate {
    private _keyBinder: KeyBinder;
    private _actions: Map<string, IAction>;
    private _onDestroy: OnDestroyCallback;
    private _title: string;
    private _description: string;

    constructor(options: IQuickeyOptions = {}) {
        options.actions = options.actions || [];

        this._actions = new Map<string, IAction>();
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

    public addAction = (actionOrActions: IQuickeyActionOptions | IQuickeyActionOptions[]) => {
        if (!(actionOrActions instanceof Array)) {
            actionOrActions = [actionOrActions];
        }

        for (const action of actionOrActions) {
            const id = action.id || guid();
            const { keys, delay, strict, callback, description } = action;

            this._addAction({
                id,
                keys,
                callback,
                description
            });

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
        this.removeAllActions();
        this._keyBinder.destroy();
        this._onDestroy && this._onDestroy(this);
    }

    public removeAction(actionId: string) {
        this._removeAction(actionId);
        this._keyBinder.unbind(actionId);

        return this;
    }

    public removeAllActions() {
        this._actions.clear();
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
            const action = this._actions.get(combination.id);
            action && action.callback(combination);
        }
    }

    private _addAction(action: IAction) {
        this._actions.set(action.id, action);
    }

    private _removeAction(actionId: string) {
        this._actions.delete(actionId);
    }
}