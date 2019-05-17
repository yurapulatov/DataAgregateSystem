import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState }  from '../store';
import * as GraphPageStore from '../store/GraphPageStore';
import * as WeatherForecasts from '../store/WeatherForecasts';
import BaseComponent from "../BaseComponent";
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

type GraphPageProps =
    GraphPageStore.GraphPageState
    & typeof GraphPageStore.actionCreators
    &  RouteComponentProps<{}>
    & {};

class GraphPage extends BaseComponent<GraphPageProps> {
    public componentWillMount(): void {
        this.props.loadTrafficAverageData();
        this.props.loadTrafficData(new Date());
    }

    public render() {
        return <div>
            <LineChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 5, right: 30, left: 20, bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
            </LineChart>
        </div>;
    }
    
}

// Wire up the React component to the Redux store
export default connect(
    (state: ApplicationState) => state.graphPageState, // Selects which state properties are merged into the component's props
    GraphPageStore.actionCreators                 // Selects which action creators are merged into the component's props
)(GraphPage) as typeof GraphPage;
