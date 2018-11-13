import "./theme.scss";
import { h } from "preact";

export interface IKeyProps {
    keyName: string;
    includeBindingType: boolean;
    type: number;
}

const BindingType = ({ type }) => type === 1 ? <span className="quickey-key-bind">></span> : <span className="quickey-key-bind">+</span>;

export default function Key(props: IKeyProps) {
    return (
        <div className="quickey-key-wrapper">
            <div className="quickey-key">
                {props.keyName}
            </div>
            {props.includeBindingType ? <BindingType type={props.type} /> : null}
        </div>

    );
}