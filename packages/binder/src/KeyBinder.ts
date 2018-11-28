import { Keyboard, keyboard, IKeyboardInput } from "@quickey/keyboard";
import { every, lc } from "@quickey/shared/lib/utils";
import { KeyBindingType } from "./enums";
import { IKeyBinding, IKeyBinderOptions } from "./interfaces";
import { SPECIAL_EVENT_KEY_MAP } from "./constants";
import { prepareKeyBinding } from "./utils";

export interface IKeyBinderDelegate {
    didMatchFound: (binder: KeyBinder, keyBindings: IKeyBinding[], target: EventTarget) => void;
}

export default class KeyBinder {
    public delegate: IKeyBinderDelegate;
    private _keyboard: Keyboard;
    private _disabled: boolean;
    private readonly _bindings: Map<string, IKeyBinding>;

    constructor(options: IKeyBinderOptions = {}) {
        const {
            bindings = [],
            disabled = false,
            target
        } = options;

        this._keyboard = (target && target instanceof EventTarget) ? new Keyboard(target) : keyboard;
        this._bindings = new Map();
        this._disabled = disabled;

        bindings.map(this.bind);

        if (!disabled) {
            this.enable();
        }
    }

    public get disabled(): boolean {
        return this._disabled;
    }

    public enable() {
        this._keyboard.getStream("keydown").pipe(this._onKeyboardKeyDown);
        this._disabled = false;
    }

    public disable() {
        this._keyboard.getStream("keydown").unpipe(this._onKeyboardKeyDown);
        this._disabled = true;
    }

    public bind = (keyBindingOptions: Partial<IKeyBinding>): IKeyBinding => {
        const keyBinding = prepareKeyBinding(keyBindingOptions);

        this._bindings.set(keyBinding.id, keyBinding);

        return keyBinding;
    }

    public unbind(keyBindingId: string) {
        this._bindings.delete(keyBindingId);
    }

    public removeAll() {
        this._bindings.clear();
    }

    private _onKeyboardKeyDown = (input: IKeyboardInput) => {
        const matches: IKeyBinding[] =
            Array.from(this._bindings.entries())
                .map(([_, keyBinding]) => keyBinding)
                .filter((keyBinding) => this._checkBinding(input, keyBinding));

        if (matches.length && this.delegate) {
            this.delegate.didMatchFound(this, matches, this._keyboard.target);
        }
    }

    private _checkBinding(input: IKeyboardInput, keyBinding: IKeyBinding): boolean {
        let bindingActivated = false;

        switch (keyBinding.type) {
            case KeyBindingType.Combination:
                bindingActivated = this._checkCombinationBinding(input, keyBinding);
                break;
            case KeyBindingType.Stream:
                bindingActivated = this._checkStreamBinding(input, keyBinding);
                break;
            case KeyBindingType.Single:
                bindingActivated = this._checkSingleBinding(input, keyBinding);
                break;
        }

        if (keyBinding.alias && !bindingActivated) {
            bindingActivated = keyBinding.alias
                .filter((alias: IKeyBinding) => this._checkBinding(input, alias)).length > 0;
        }

        return bindingActivated;
    }

    private _checkCombinationBinding(input: IKeyboardInput, keyBinding: IKeyBinding): boolean {
        return every<boolean>([

            this._keyboard.activeKeys > 1,

            every<string>(keyBinding.parts, (key) => this._isActiveKey(key)),

            keyBinding.strict
                ? this._keyboard.activeKeys === keyBinding.parts.length
                : true
        ]);
    }

    private _checkStreamBinding(input: IKeyboardInput, keyBinding: IKeyBinding): boolean {
        const streamParts = keyBinding.parts;
        const isMatchKey = this._isInputMatchKey(input, streamParts[keyBinding.sequence]);

        if (isMatchKey) {
            if (keyBinding.sequence === streamParts.length - 1) {
                this._resetBinding(keyBinding);
                return keyBinding.strict
                    ? this._keyboard.activeKeys === 1
                    : true;
            }

            keyBinding.sequence++;

            window.clearTimeout(keyBinding.sequenceTimer);

            keyBinding.sequenceTimer = setTimeout(() => {
                this._resetBinding(keyBinding);
            }, keyBinding.delay);
        } else {
            this._resetBinding(keyBinding);
        }

        return false;
    }

    private _checkSingleBinding(input: IKeyboardInput, keyBinding: IKeyBinding): boolean {
        const isMatchKey = this._isInputMatchKey(input, keyBinding.parts[0]);

        return every<boolean>([
            isMatchKey,

            keyBinding.strict
                ? this._keyboard.activeKeys === 1
                : true
        ]);
    }

    private _resetBinding(keyBinding: IKeyBinding) {
        window.clearTimeout(keyBinding.sequenceTimer);
        keyBinding.sequenceTimer = null;
        keyBinding.sequence = 0;
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
        this.disable();
        this.removeAll();

        if (this._keyboard !== keyboard) {
            this._keyboard.destroy();
        }
    }
}