import { h } from "preact";
import { IAction } from "@quickey/core";
import QuickeyAction from "./QuickeyAction";

export interface IQuickeyItemProps {
    key: any;
    actions: IAction[];
    title: string;
}

export default function QuickeyItem(props: IQuickeyItemProps) {
    return (
        <div className="quickey-item">
            {props.title ? <h3>{props.title}</h3> : null}
            <div className="quickey-item-actions">
                {props.actions.map((action) => <QuickeyAction key={action.id} action={action} />)}
            </div>
        </div>
    );
}