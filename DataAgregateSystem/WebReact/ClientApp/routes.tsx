import * as React from 'react';
import {Route, Switch} from 'react-router-dom';
import { Layout } from './components/Layout';
import Home from './components/Home';
import FetchData from './components/FetchData';
import GraphPage from './components/GraphPage';

export const routes = <Layout>
    <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/graph' component={GraphPage}/>
        <Route exact path='/fetch' component={FetchData}/>
    </Switch>
</Layout>;
