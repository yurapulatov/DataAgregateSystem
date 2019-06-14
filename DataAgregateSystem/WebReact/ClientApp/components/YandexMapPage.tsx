import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState }  from '../store';
import BaseComponent from "../BaseComponent";
import { YMaps, Map, Placemark } from "react-yandex-maps";


const mapData = {
    center: [56.010563, 92.852572],
    zoom: 12
};

export default class YandexMapPage extends BaseComponent<RouteComponentProps<{}>> {


    public render() {
        return <div  style={{alignContent: "center", margin: 20}}>
            <h1>Текущая дорожная ситуация</h1>
            <YMaps>
                <Map
                    width="100%"
                    height={500}    
                    state={mapData}>
                </Map>
            </YMaps>
        </div>
    }
}

