import { h } from "preact";
import { IAction } from "@quickey/core";
import Key from "./Key";

export interface IQuickeyActionProps {
    key: any;
    action: IAction;
}

const renderActionParts = (action: IAction) => (
    <div className="quickey-action-parts">
        {action.parts.map((k, i) => renderKey(k, action.type, i))}
    </div>
);
const renderKey = (k: string, type: number, index: number) => <Key key={index} keyName={k} type={type} />;

export default (props: IQuickeyActionProps) => (
    <div className="quickey-action">
        {renderActionParts(props.action)}
        {props.action.alias ? props.action.alias.map((a, i) =>
            <span>, {renderActionParts(a)}</span>
        ) : null}
        <div className="quickey-action-description">
            {props.action.description}
        </div>
    </div>
);