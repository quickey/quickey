import { h, Component } from "preact";
import { Quickey, IAction } from "@quickey/core";
import { multiWordFilter } from "../../utils";
import QuickeyItem from "./QuickeyItem";
import SearchBar from "./SearchBar";
import NoResultsMessage from "./NoResultsMessage";
import Footer from "./Footer";

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

const filterQuickeyActions = (actions: IAction[], query: string) => actions.filter((action) => multiWordFilter(action.description, query));

export default class QuickeyLegend extends Component<IQuickeyLegendProps, IQuickeyLegendState> {
    state = { query: "" };

    private onSearch = (e) => {
        this.setState({ query: e.target.value });
    }

    public render() {
        const { quickeys, title, showCredits, searchBarPlaceholder, style } = this.props;
        const { query } = this.state;
        let hasActionsForQuery = false;

        return (
            <div className="quickey-legend" style={style}>
                <h1>{title}</h1>
                <SearchBar placeholder={searchBarPlaceholder} onSearch={this.onSearch} value={query} />
                <div className="quickey-legend-items">
                    {quickeys.map((q) => {
                        const filteredActions = filterQuickeyActions(q.actions, query);
                        if (filteredActions.length) {
                            hasActionsForQuery = true;
                            return (
                                <QuickeyItem
                                    key={q.id}
                                    actions={filteredActions}
                                    title={q.title}
                                />
                            );
                        }
                        return null;
                    })}
                </div>
                {!hasActionsForQuery ? (<NoResultsMessage query={query} />) : null}
                {showCredits ? <Footer /> : null}
            </div>
        );
    }
}