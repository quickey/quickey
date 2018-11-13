import "./theme.scss";
import { h, Component } from "preact";
import { Quickey } from "@quickey/core";
import QuickeyItem from "../quickeyItem/QuickeyItem";
import SearchBar from "../searchBar/SearchBar";
import Footer from "../footer/Footer";

export interface IQuickeyBoxProps {
    quickeys: Quickey[];
    title: string;
    showCredits: boolean;
    searchBarPlaceholder: string;
    style: any;
}

export interface IQuickeyBoxState {
    query: string;
}

const filterActions = (actions, query) => actions.filter((a) => !!~a.description.toLowerCase().indexOf(query));

export default class QuickeyBox extends Component<IQuickeyBoxProps, IQuickeyBoxState> {
    state = { query: "" };

    private onSearch = (e) => {
        this.setState({ query: e.target.value });
    }

    public render() {
        const { query } = this.state;
        const { quickeys, title, showCredits, searchBarPlaceholder, style } = this.props;
        const queryLowerCased = query.toLowerCase();

        let hasActionsForQuery = false;

        return (
            <div className="quickey-box" style={style}>
                <h1>{title}</h1>
                <SearchBar placeholder={searchBarPlaceholder} onSearch={this.onSearch} query={query} />
                <div className="quickey-box-items">
                    {quickeys.map((q) => {

                        const filteredActions = filterActions(q.actions, queryLowerCased);

                        if (filteredActions.length) {
                            hasActionsForQuery = true;
                        } else {
                            return null;
                        }

                        return (
                            <QuickeyItem
                                key={q.id}
                                actions={filteredActions}
                                title={q.title}
                                description={q.description}
                            />
                        );
                    })}
                </div>
                {!hasActionsForQuery ? (
                    <div className="quickey-box-no-actions">
                        <h2>🙈</h2>
                        <h3>No shortcuts found for `{query}`</h3>
                    </div>
                ) : null}
                {showCredits ? <Footer /> : null}
            </div>
        );
    }
}