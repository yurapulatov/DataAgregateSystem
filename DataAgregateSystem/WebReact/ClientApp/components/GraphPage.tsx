import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState }  from '../store';
import * as GraphPageStore from '../store/GraphPageStore';
import * as WeatherForecasts from '../store/WeatherForecasts';
import BaseComponent from "../BaseComponent";

type GraphPageProps =
    GraphPageStore.GraphPageState
    & typeof GraphPageStore.actionCreators
    &  RouteComponentProps<{}>
    & {};

class GraphPage extends BaseComponent<GraphPageProps> {
    public render() {
        return <div>
            <h1>Counter</h1>

            <p>This is a simple example of a React component.</p>

            <p>Current count: <strong></strong></p>

            <button onClick={ () => {} }>Increment</button>
        </div>;
    }
}

// Wire up the React component to the Redux store
export default connect(
    (state: ApplicationState) => state.graphPageState, // Selects which state properties are merged into the component's props
    GraphPageStore.actionCreators                 // Selects which action creators are merged into the component's props
)(GraphPage) as typeof GraphPage;
