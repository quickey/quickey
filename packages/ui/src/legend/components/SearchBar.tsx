import { h } from "preact";

export interface ISearchBarProps {
    onSearch: (e: Event) => void;
    value: string;
    placeholder: string;
}

export default (props: ISearchBarProps) => (
    <div className="quickey-search-bar">
        <input placeholder={props.placeholder} type="text" onChange={props.onSearch} value={props.value} />
    </div>
);