import * as React from "react";
import { createQuickey, IQuickeyOptions, ActionCallback, Quickey, IActionOptions } from "@quickey/core";

export interface IQuickeyContextProps extends Pick<IQuickeyOptions, Exclude<keyof IQuickeyOptions, "target">>, React.HTMLAttributes<HTMLElement> {
    type?: string;
    global?: boolean;
}

export interface IQuickeyContextState {

}

export default class QuickeyContext extends React.Component<IQuickeyContextProps, IQuickeyContextState> {

    public static defaultProps: Partial<IQuickeyContextProps> = {
        type: "div",
        global: false
    };

    private _element: React.RefObject<HTMLElement>;
    private _quickey: Quickey;

    constructor(props, context) {
        super(props, context);

        this._element = React.createRef<HTMLElement>();
        this._quickey = null;
    }

    public componentDidMount() {
        const { global, title, id, actions, onDestroy } = this.props;

        const options: IQuickeyOptions = {
            id,
            title,
            actions,
            onDestroy
        };

        if (!global) {
            options.target = this._element.current;
        }

        this._quickey = createQuickey(options);
    }

    public componentWillUnmount() {
        this._quickey && this._quickey.destroy();
        this._quickey = null;
    }

    public get quickey(): Quickey {
        return this.quickey;
    }

    public removeAction(actionId: string) {
        this._quickey.removeAction(actionId);
    }

    public addAction(actionOrActions: IActionOptions | IActionOptions[]);
    public addAction(keys: string, callback: ActionCallback);
    public addAction(actionOrKeys: IActionOptions | IActionOptions[] | string, callback?: ActionCallback): void {
        if (typeof actionOrKeys === "string") {
            this._quickey.addAction(actionOrKeys, callback);
        } else {
            this._quickey.addAction(actionOrKeys);
        }
    }

    public render(): React.ReactNode {
        const { global, type, title, actions, onDestroy, ...others } = this.props;
        const { children } = this.props;

        if (global) {
            return children;
        }

        if (React.Children.count(children) === 1) {
            return React.cloneElement(children as React.ReactElement<any>, {
                ref: this._element
            });
        }

        return React.createElement(type, {
            ...others,
            ref: this._element
        });
    }
}