import * as React from "react";
import { createQuickey, IQuickeyOptions, IQuickeyActionOptions } from "@quickey/core";
import Quickey from "@quickey/core/lib/Quickey";

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

    private element: React.RefObject<HTMLElement>;
    private quickey: Quickey;

    constructor(props, context) {
        super(props, context);

        this.element = React.createRef<HTMLElement>();
        this.quickey = null;
    }

    public componentDidMount() {
        const { global, title, description, actions, onDestroy } = this.props;

        const options: IQuickeyOptions = {
            title,
            description,
            actions,
            onDestroy
        };

        if (!global) {
            options.target = this.element.current;
        }

        this.quickey = createQuickey(options);
    }

    public componentWillUnmount() {
        this.quickey && this.quickey.destroy();
        this.quickey = null;
    }

    public removeAction(actionId: string) {
        this.quickey.removeAction(actionId);
    }

    public addAction(actionOrActions: IQuickeyActionOptions | IQuickeyActionOptions[]) {
        this.quickey.addAction(actionOrActions);
    }

    public play() {
        this.quickey.play();
    }

    public pause() {
        this.quickey.pause();
    }

    public get paused(): boolean {
        return this.quickey.paused;
    }

    public render(): React.ReactNode {
        const { global, type, title, description, actions, onDestroy, ...others } = this.props;
        const { children } = this.props;

        if (global) {
            return children;
        }

        if (React.Children.count(children) === 1) {
            return React.cloneElement(children as React.ReactElement<any>, {
                ref: this.element
            });
        }

        return React.createElement(type, {
            ...others,
            ref: this.element
        });
    }
}