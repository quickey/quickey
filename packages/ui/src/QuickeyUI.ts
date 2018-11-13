import { getQuickeyInstance } from "@quickey/core";
import QuickeyBox from "./components/quickeyBox/QuickeyBox";
import { h, rerender, render } from "preact";

export interface IQuickeyUIOptions {
    ids: string[];
    el: HTMLElement;
    title?: string;
    showCredits?: boolean;
    searchBarPlaceholder?: string;
    style?: any;
}

export default class QuickeyUI {
    private _options: IQuickeyUIOptions;
    private _root: any;

    constructor(options: IQuickeyUIOptions) {
        this._options = Object.assign({}, {
            title: "Keyboard Shortcuts",
            searchBarPlaceholder: "Search shortcut...",
            showCredits: true,
            style: {}
        }, options);
    }

    public show() {


        this._root = render(h(QuickeyBox, {
            quickeys: getQuickeyInstance(this._options.ids),
            title: this._options.title,
            showCredits: this._options.showCredits,
            style: this._options.style,
            searchBarPlaceholder: this._options.searchBarPlaceholder
        }), this._options.el);

    }

    public hide() {


        render("", this._options.el, this._root);

    }

    public destroy() {
        this.hide();
    }
}