import { guid } from "@quickey/shared/lib/utils";
import { PubSub } from "@quickey/shared";
import { KeyBinder, IKeyBinderDelegate, IKeyBinding, KeyBindingType } from "@quickey/binder";

export type ActionCallback = (keyBinding?: IKeyBinding, target?: EventTarget) => void;
export type OnDestroyCallback = (quickey: Quickey) => void;

export interface IActionOptions extends Pick<IKeyBinding, Exclude<keyof IKeyBinding, "sequence" | "sequenceTimer" | "type" | "parts">> {
    description?: string;
    callback: ActionCallback;
}

export interface IAction extends Pick<IActionOptions, Exclude<keyof IActionOptions, "strict" | "delay" | "keys">> {
    type: KeyBindingType;
    parts: string[];
}

export interface IQuickeyOptions {
    id?: string;
    title?: string;
    actions?: IActionOptions[];
    onDestroy?: OnDestroyCallback;
    target?: EventTarget;
}

export default class Quickey extends PubSub implements IKeyBinderDelegate {
    private _id: string;
    private _keyBinder: KeyBinder;
    private _actions: Map<string, IAction>;
    private _onDestroy: OnDestroyCallback;
    private _title: string;

    constructor(options: IQuickeyOptions = {}) {
        super();

        options.actions = options.actions || [];

        this._id = options.id || guid();
        this._actions = new Map<string, IAction>();
        this._title = options.title;
        this._keyBinder = new KeyBinder({
            target: options.target
        });
        this._keyBinder.delegate = this;
        this._onDestroy = options.onDestroy;

        options.actions.map(this.addAction);
    }

    public get id(): string {
        return this._id;
    }

    public get title(): string {
        return this._title || "";
    }

    public get disabled(): boolean {
        return this._keyBinder.disabled;
    }

    public get actions(): IAction[] {
        return Array.from(this._actions.values());
    }

    public addAction = (actionOrActions: IActionOptions | IActionOptions[]): Quickey => {
        if (!(actionOrActions instanceof Array)) {
            actionOrActions = [actionOrActions];
        }

        for (const action of actionOrActions) {
            const id = action.id || guid();
            const { keys, delay, strict, callback, description = "" } = action;

            const { parts, type } = this._keyBinder.bind({
                id,
                keys,
                delay,
                strict
            });

            this._actions.set(id, {
                id,
                type,
                parts,
                callback,
                description
            });
        }

        this.update();

        return this;
    }

    public enable() {
        this._keyBinder.enable();
    }

    public disable() {
        this._keyBinder.disable();
    }

    public destroy() {
        this.removeAllActions();
        this._keyBinder.destroy();
        this._onDestroy && this._onDestroy(this);
        this.removeAllSubscriptions();
    }

    public removeAction(actionId: string): Quickey {
        this._actions.delete(actionId);
        this._keyBinder.unbind(actionId);

        this.update();

        return this;
    }

    public removeAllActions(): Quickey {
        this._actions.clear();
        this._keyBinder.removeAll();

        return this;
    }

    /**
     * IKeyBinderDelegate matched key binding callback
     *
     * @param {KeyBinder} binder
     * @param {IKeyBinding[]} keyBindings
     * @memberof Quickey
     */
    public didMatchFound(binder: KeyBinder, keyBindings: IKeyBinding[], target: EventTarget) {
        for (const keyBinding of keyBindings) {
            const action = this._actions.get(keyBinding.id);
            action && action.callback(keyBinding, target);
        }
    }
}