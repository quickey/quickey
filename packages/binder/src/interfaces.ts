import { KeyBindingType } from "./enums";

export interface IKeyBinding {
    id?: string;
    keys: string;
    alias?: Partial<IKeyBinding>[];
    delay?: number;
    strict?: boolean;
    sequence: number,
    sequenceTimer: any
    readonly type: KeyBindingType;
    readonly parts: string[];
}

export interface IKeyBinderOptions {
    bindings?: Partial<IKeyBinding>[];
    disabled?: boolean;
    target?: EventTarget;
}