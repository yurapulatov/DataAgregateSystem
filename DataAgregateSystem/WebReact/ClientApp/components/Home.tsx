import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import BaseComponent from "../BaseComponent";

export default class Home extends BaseComponent<RouteComponentProps<{}>> {
    public render() {
        return <div>
            <h1>Hello, world!</h1>
            
        </div>;
    }
}
