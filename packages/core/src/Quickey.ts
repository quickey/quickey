import { guid } from "@quickey/shared/lib/utils";
import { PubSub } from "@quickey/shared";
import { KeyBinder, IKeyBinderDelegate, IKeyBinding, KeyBindingType } from "@quickey/binder";

export type ActionCallback = (keyBinding?: IKeyBinding, target?: EventTarget) => void;
export type OnDestroyCallback = (quickey: Quickey) => void;

export interface IActionOptions extends Pick<IKeyBinding, Exclude<keyof IKeyBinding, "sequence" | "sequenceTimer" | "type" | "parts">> {
    description?: string;
    callback: ActionCallback;
}

export interface IAction extends Pick<IActionOptions, Exclude<keyof IActionOptions, "strict" | "delay" | "keys" | "alias">> {
    type: KeyBindingType;
    parts: string[];
    alias?: IAction[];
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
        this.addAction = this.addAction.bind(this);

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

    public getAction(actionId: string): IAction {
        return this._actions.get(actionId);
    }

    public addAction(actionOrActions: IActionOptions | IActionOptions[]);
    public addAction(keys: string, callback: ActionCallback);
    public addAction(actionOrKeys: IActionOptions | IActionOptions[] | string, callback?: ActionCallback): Quickey {

        if (typeof actionOrKeys === "string") {
            actionOrKeys = [{ keys: actionOrKeys, callback }];
        } else if (!(actionOrKeys instanceof Array)) {
            actionOrKeys = [actionOrKeys];
        }

        for (const action of actionOrKeys) {
            const id = action.id || guid();
            const { keys, delay, strict, callback, alias, description = "" } = action;

            const { parts, type, alias: binderAlias = [] } = this._keyBinder.bind({
                id,
                keys,
                alias,
                delay,
                strict
            });

            this._actions.set(id, {
                id,
                type,
                alias: binderAlias.map<IAction>((a) => ({ id: a.id, type: a.type, parts: a.parts, callback })),
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