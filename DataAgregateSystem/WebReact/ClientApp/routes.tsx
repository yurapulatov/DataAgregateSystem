import * as React from 'react';
import {Route, Switch} from 'react-router-dom';
import { Layout } from './components/Layout';
import Home from './components/Home';
import YandexMapPage from './components/YandexMapPage';
import GraphPage from './components/GraphPage';

export const routes = <Layout>
    <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/graph' component={GraphPage}/>
        <Route exact path='/map' component={YandexMapPage}/>
    </Switch>
</Layout>;
