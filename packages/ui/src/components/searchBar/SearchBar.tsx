import "./theme.scss";
import { h } from "preact";

export interface ISearchBarProps {
    onSearch: (e: KeyboardEvent) => void;
    query: string;
    placeholder: string;
}

export default function SearchBar(props: ISearchBarProps) {
    return (
        <div className="quickey-search-bar">
            <input placeholder={props.placeholder} type="text" onInput={props.onSearch} value={props.query} />
        </div>
    );
}