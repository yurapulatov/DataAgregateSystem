import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState }  from '../store';
import BaseComponent from "../BaseComponent";
import { YMaps, Map, Placemark } from "react-yandex-maps";


const mapData = {
    center: [92.852572, 56.010563],
    zoom: 12
};

export default class YandexMapPage extends BaseComponent<RouteComponentProps<{}>> {


    public render() {
        return <div>
            <YMaps>
                <Map defaultState={mapData}>
                </Map>
            </YMaps>
        </div>
    }
}

