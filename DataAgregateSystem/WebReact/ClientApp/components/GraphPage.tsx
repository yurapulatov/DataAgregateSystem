import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState }  from '../store';
import * as GraphPageStore from '../store/GraphPageStore';
import BaseComponent from "../BaseComponent";
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import DatePicker from "react-date-picker"

type GraphPageProps =
    GraphPageStore.GraphPageState
    & typeof GraphPageStore.actionCreators
    &  RouteComponentProps<{}>
    & {};

class GraphPage extends BaseComponent<GraphPageProps> {
    public componentWillMount() {
        this.props.loadTrafficData(new Date());
    }

    public render() {
        return (<div>
            <div>
                <LineChart
                    width={1000}
                    height={500}
                    data={this.props.data}
                    margin={{
                        top: 5, right: 30, left: 20, bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="data" stroke="#82ca9d" />
                </LineChart>
            </div>
            <div>
                <DatePicker value = {this.props.chooseDate} onChange = {this.props.loadTrafficData}/>
            </div>
        </div>)
    }
    
}

// Wire up the React component to the Redux store
export default connect(
    (state: ApplicationState) => state.graphPage, // Selects which state properties are merged into the component's props
    GraphPageStore.actionCreators                 // Selects which action creators are merged into the component's props
)(GraphPage) as typeof GraphPage;
