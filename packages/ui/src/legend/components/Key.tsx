import { h } from "preact";
import KeyBindingSymbol from "./KeyBindingSymbol";

export interface IKeyProps {
    key: any;
    keyName: string;
    type: number;
}

export default (props: IKeyProps) => (
    <div className="quickey-key-wrapper">
        <div className="quickey-key">{props.keyName}</div>
        <KeyBindingSymbol type={props.type} />
    </div>
);