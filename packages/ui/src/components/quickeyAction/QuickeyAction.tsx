import "./theme.scss";
import { h } from "preact";
import { Quickey, IAction } from "@quickey/core";
import Key from "../key/Key";

export interface IQuickeyItemProps {
    action: IAction;
}

export default function QuickeyAction(props: IQuickeyItemProps) {
    return (
        <div className="quickey-action">
            <div className="quickey-action-parts">
                {props.action.parts.map((k, i) => <Key key={i} keyName={k} type={props.action.type} includeBindingType={i < props.action.parts.length - 1} />)}
            </div>
            <div className="quickey-action-description">
                {props.action.description}
            </div>
        </div>
    );
}