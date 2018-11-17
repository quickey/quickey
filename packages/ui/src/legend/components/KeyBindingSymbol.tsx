import { h } from "preact";

const BINDING_TYPE_SYMBOLS = {
    1: ">",
    2: "+"
};

export interface IKeyBindingSymbolProps {
    type: number;
}

export default function KeyBindingSymbol(props: IKeyBindingSymbolProps) {
    return (
        <span className="quickey-key-binding-symbol">{BINDING_TYPE_SYMBOLS[props.type]}</span>
    );
}