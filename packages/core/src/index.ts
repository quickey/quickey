/*************************************
   ____        _      _              
  / __ \      (_)    | |             
 | |  | |_   _ _  ___| | _____ _   _ 
 | |  | | | | | |/ __| |/ / _ \ | | |
 | |__| | |_| | | (__|   <  __/ |_| |
  \___\_\\__,_|_|\___|_|\_\___|\__, |
                                __/ |
                               |___/ 
**************************************/

import Quickey, { IQuickeyOptions, ActionCallback, OnDestroyCallback } from "./Quickey";

const quickeys: Quickey[] = [
    /**
     * Holds all quickey instances
     */
];

function createOptions(o: IQuickeyOptions = {}): IQuickeyOptions {
    const destroyCallback = o.onDestroy;

    o.onDestroy = (quickey: Quickey) => {
        destroyCallback && destroyCallback(quickey);
        quickeys.splice(quickeys.indexOf(quickey), 1);
    };

    return o;
}

function createQuickey(options?: IQuickeyOptions): Quickey;
function createQuickey(options?: IQuickeyOptions[]): Quickey[];
function createQuickey(options?: IQuickeyOptions | IQuickeyOptions[]): Quickey | Quickey[] {
    if (!(options instanceof Array)) {
        options = [options];
    }

    if (options.length <= 1) {
        const q = new Quickey(createOptions(options[0]));
        quickeys.push(q);

        return q;
    }

    const qs = options.map((o: IQuickeyOptions) => new Quickey(createOptions(o)));

    Array.prototype.push.apply(quickeys, qs);

    return qs;
}

export {
    IQuickeyOptions,
    ActionCallback,
    OnDestroyCallback,
    createQuickey
};