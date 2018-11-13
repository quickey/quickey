import { getQuickeyInstance } from "@quickey/core";
import QuickeyLegend from "./components/quickeyLegend/QuickeyLegend";
import { h, render } from "preact";

interface IQuickeyLegendOptions {
    ids: string[];
    el: HTMLElement;
    title?: string;
    showCredits?: boolean;
    searchBarPlaceholder?: string;
    style?: any;
}

function createQuickeyLegend(options: IQuickeyLegendOptions): () => void {
    options = Object.assign({}, {
        title: "Keyboard Shortcuts",
        searchBarPlaceholder: "Search shortcut...",
        showCredits: true,
        style: {}
    }, options);

    const root = render(h(QuickeyLegend, {
        quickeys: getQuickeyInstance(options.ids),
        title: options.title,
        showCredits: options.showCredits,
        style: options.style,
        searchBarPlaceholder: options.searchBarPlaceholder
    }), options.el);

    return () => render("", options.el, root);
}

export {
    IQuickeyLegendOptions,
    createQuickeyLegend
};