import { h } from "preact";
import { IAction } from "@quickey/core";
import QuickeyAction from "../quickeyAction/QuickeyAction";

export interface IQuickeyItemProps {
    key: any;
    actions: IAction[];
    title: string;
    description: string;
}

export default function QuickeyItem(props: IQuickeyItemProps) {

    const { actions, title, description } = props;


    return (
        <div className="quickey-item">
            {title ? <h3>{title}</h3> : null}
            <div className="quickey-item-actions">
                {actions.map((action) => <QuickeyAction key={action.id} action={action} />)}
            </div>
        </div>
    );
}