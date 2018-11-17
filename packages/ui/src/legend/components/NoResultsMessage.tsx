import { h } from "preact";

export interface INoResultsMessageProps {
    query: string;
}

export default function NoResultsMessage(props: INoResultsMessageProps) {
    return (
        <div className="quickey-no-results-message">
            <h2>🙈</h2>
            <h3>No shortcuts found for `{props.query}`</h3>
        </div>
    );
}