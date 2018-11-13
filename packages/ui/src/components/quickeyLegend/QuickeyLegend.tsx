import { h, Component } from "preact";
import { Quickey } from "@quickey/core";
import QuickeyItem from "../quickeyItem/QuickeyItem";
import SearchBar from "../searchBar/SearchBar";
import Footer from "../footer/Footer";

export interface IQuickeyLegendProps {
    quickeys: Quickey[];
    title: string;
    showCredits: boolean;
    searchBarPlaceholder: string;
    style: any;
}

export interface IQuickeyLegendState {
    query: string;
}

const filterActions = (actions, query) => actions.filter((a) => !!~a.description.toLowerCase().indexOf(query));

export default class QuickeyLegend extends Component<IQuickeyLegendProps, IQuickeyLegendState> {
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
            <div className="quickey-legend" style={style}>
                <h1>{title}</h1>
                <SearchBar placeholder={searchBarPlaceholder} onSearch={this.onSearch} query={query} />
                <div className="quickey-legend-items">
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
                    <div className="quickey-legend-no-actions">
                        <h2>🙈</h2>
                        <h3>No shortcuts found for `{query}`</h3>
                    </div>
                ) : null}
                {showCredits ? <Footer /> : null}
            </div>
        );
    }
}