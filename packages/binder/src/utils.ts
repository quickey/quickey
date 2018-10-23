import { guid } from "@quickey/shared/lib/utils";
import { IKeyBindCombination } from "./interfaces";
import { CombinationType } from "./enums";

class KeyBinderError extends TypeError { }

export function prepareCombination(opts): IKeyBindCombination {
    const dto: IKeyBindCombination = {
        id: opts.id || guid(),
        keys: opts.keys.trim().toUpperCase(),
        delay: opts.delay || 250,
        sequence: 0,
        strict: opts.strict || false,
        sequenceTimer: null
    };

    const sequenceParts = dto.keys.split(/ \> /);
    const connectionParts = dto.keys.split(/ \+ /);
    
    if (sequenceParts.length > 1 && connectionParts.length > 1) {
        throw new KeyBinderError("Only one combination type is allowed for combination (use '>' or '+')");
    }

    if (sequenceParts.length > 1) {
        dto.type = CombinationType.Sequence;
        dto.parts = sequenceParts;
    } else if (connectionParts.length > 1) {
        dto.type = CombinationType.Connection;
        dto.parts = connectionParts;
    } else {
        throw new KeyBinderError("Can't create combination for one key");
    }

    return dto;
}