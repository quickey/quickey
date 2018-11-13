import QuickeyUI, { IQuickeyUIOptions } from "./QuickeyUI";

function create(options: IQuickeyUIOptions): QuickeyUI {
    return new QuickeyUI(options);
}

export {
    create
};