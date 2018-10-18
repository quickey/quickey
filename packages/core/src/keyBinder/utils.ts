import { guid } from "shared/utils";
import { IKeyBindCombination } from "./interfaces";
import { CombinationType } from "./enums";

export function prepareCombination(opts): IKeyBindCombination {
    const dto: IKeyBindCombination = {
        id: opts.id || guid(),
        keys: opts.keys.replace(/ /g, "").toUpperCase(),
        delay: opts.delay || 250,
        sequence: 0,
        strict: opts.strict || false,
        sequenceTimer: null
    };

    const sequenceParts = dto.keys.split(">");
    const connectionParts = dto.keys.split("+");

    if (sequenceParts.length > 1) {
        dto.type = CombinationType.Sequence;
        dto.parts = sequenceParts;
    } else {
        dto.type = CombinationType.Connection;
        dto.parts = connectionParts;
    }

    return dto;
}