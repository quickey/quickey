import * as React from "react";
import { QuickeyContext } from "@quickey/react";

export interface IHomeProps {

}

export interface IHomeState {
    godMode: boolean;
    fullInventory: boolean;
}

export default class Home extends React.Component<IHomeProps, IHomeState> {

    public static defaultProps: Partial<IHomeProps> = {

    };

    constructor(props, context) {
        super(props, context);

        this.state = {
            fullInventory: false,
            godMode: false
        };
    }

    private toggleCheatState(cheat: string) {
        const nextState: any = {
            [cheat]: !this.state[cheat]
        };

        this.setState(nextState);
    }

    private onGodMode = () => {
        this.toggleCheatState("godMode");
    }

    private onFullInventory = () => {
        this.toggleCheatState("fullInventory");
    }

    private cheatState(cheat) {
        return this.state[cheat] ? <div style={{ color: "green" }}>On</div> : <div style={{ color: "red" }}>Off</div>;
    }

    public render(): JSX.Element {

        const { } = this.props;

        return (
            <QuickeyContext
                global={true}
                actions={[
                    { keys: "I > D > D > Q > D", callback: this.onGodMode },
                    { keys: "I > D > K > F > A", callback: this.onFullInventory }
                ]}
            >
                <h1>Type some DOOM cheats</h1>
                <h3>God Mode: {this.cheatState("godMode")}</h3>
                <h3>Full Inventory: {this.cheatState("fullInventory")}</h3>
            </QuickeyContext>
        );
    }
}
