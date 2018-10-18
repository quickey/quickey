import Quickey, { IQuickeyOptions, ActionCallback } from "./Quickey";

export {
    IQuickeyOptions,
    ActionCallback
};

export function createQuickey(options: IQuickeyOptions = {}) {
    return new Quickey(options);
}