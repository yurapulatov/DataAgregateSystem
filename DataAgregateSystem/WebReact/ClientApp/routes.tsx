import * as React from 'react';
import {Route, Switch} from 'react-router-dom';
import { Layout } from './components/Layout';
import Home from './components/Home';
import FetchData from './components/FetchData';
import Counter from './components/Counter';

export const routes = <Layout>
    <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/counter' component={Counter}/>
        <Route exact path='/fetch' component={FetchData}/>
    </Switch>
</Layout>;
