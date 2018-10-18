import { CombinationType } from "./enums";

export interface IKeyBindCombination {
    id?: string;
    keys: string;
    delay?: number;
    strict?: boolean;
    type?: CombinationType;
    parts?: string[];
    sequence?: number,
    sequenceTimer?: any
}

export interface IKeyBinderOptions {
    combinations?: IKeyBindCombination[];
    autoPlay?: boolean;
}

export interface IKeyRecordParams {
    key: string;
    code: number;
}