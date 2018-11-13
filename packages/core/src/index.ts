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

import Quickey, { IQuickeyOptions, IAction, IActionOptions, ActionCallback, OnDestroyCallback } from "./Quickey";

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

function queryByQuickeyId(ids: string | string[], quickey: Quickey): boolean {
    return (ids instanceof Array)
        ? !!~ids.indexOf(quickey.id)
        : quickey.id === ids;
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

function getQuickeyInstance(ids: string): Quickey;
function getQuickeyInstance(ids: string[]): Quickey[];
function getQuickeyInstance(ids: string | string[]): Quickey | Quickey[] {
    const query = queryByQuickeyId.bind(null, ids);

    if (ids instanceof Array) {
        return quickeys.filter(query);
    }

    return quickeys.find(query);
}

export {
    IQuickeyOptions,
    IActionOptions,
    IAction,
    ActionCallback,
    OnDestroyCallback,
    Quickey,
    createQuickey,
    getQuickeyInstance
};