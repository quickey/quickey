import { getQuickeyInstance } from "@quickey/core";
import { h, render } from "preact";
import QuickeyLegend from "./components/QuickeyLegend";

export interface IQuickeyLegendOptions {
    ids: string[];
    el: HTMLElement;
    title?: string;
    showCredits?: boolean;
    searchBarPlaceholder?: string;
    style?: any;
}

export function createQuickeyLegend(options: IQuickeyLegendOptions): () => void {
    options = Object.assign({}, {
        title: "Keyboard Shortcuts",
        searchBarPlaceholder: "Search for shortcut...",
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