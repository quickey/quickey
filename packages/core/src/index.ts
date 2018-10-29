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

import Quickey, { IQuickeyOptions, IQuickeyActionOptions, ActionCallback, OnDestroyCallback } from "./Quickey";

const quickeys: Quickey[] = [
    /**
     * Holds all quickey instances
     */
];

function enhanceOptions(o: IQuickeyOptions = {}): IQuickeyOptions {
    const destroyCallback = o.onDestroy;

    o.onDestroy = (quickey: Quickey) => {
        destroyCallback && destroyCallback(quickey);

        const quickeyLocation = quickeys.indexOf(quickey);

        if (quickeyLocation > -1) {
            quickeys.splice(quickeyLocation, 1);
        }
    };

    return o;
}

function create(options: IQuickeyOptions): Quickey {
    return new Quickey(enhanceOptions(options));
}

function createQuickey(options?: IQuickeyOptions): Quickey;
function createQuickey(options?: IQuickeyOptions[]): Quickey[];
function createQuickey(options?: IQuickeyOptions | IQuickeyOptions[]): Quickey | Quickey[] {
    if (!(options instanceof Array)) {
        const q = create(options);
        
        quickeys.push(q);

        return q;
    }

    const qs = options.map(create);

    Array.prototype.push.apply(quickeys, qs);

    return qs;
}

export {
    IQuickeyOptions,
    IQuickeyActionOptions,
    ActionCallback,
    OnDestroyCallback,
    createQuickey
};