import { guid } from "@quickey/shared/lib/utils";
import { IKeyBinding } from "./interfaces";
import { KeyBindingType } from "./enums";

class KeyBinderError extends TypeError { }

export function prepareKeyBinding(opts: Partial<IKeyBinding>): IKeyBinding {
    const dto: any = {
        id: opts.id || guid(),
        keys: opts.keys.trim().toUpperCase(),
        delay: opts.delay || 250,
        strict: opts.strict || false,
        sequence: 0,
        sequenceTimer: null
    };

    const streamParts = dto.keys.split(/ \> /);
    const connectionParts = dto.keys.split(/ \+ /);

    if (streamParts.length > 1 && connectionParts.length > 1) {
        throw new KeyBinderError("only one type is allowed for binding (use '>' or '+'), use `alias` option.");
    }

    if (streamParts.length > 1) {
        dto.type = KeyBindingType.Stream;
        dto.parts = streamParts;
    } else if (connectionParts.length > 1) {
        dto.type = KeyBindingType.Combination;
        dto.parts = connectionParts;
    } else {
        dto.type = KeyBindingType.Single;
        dto.parts = [dto.keys];
    }

    if (opts.alias) {
        dto.alias = opts.alias.map((alias) => prepareKeyBinding(alias));
    }

    return dto as IKeyBinding;
}