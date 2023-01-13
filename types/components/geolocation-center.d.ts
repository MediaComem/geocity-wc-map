import Map from 'ol/Map.js';
import View from 'ol/View.js';
import { Control } from 'ol/control';
import Geolocation from 'ol/Geolocation';
export default class GeolocationCenter extends Control {
    map: Map;
    view: View;
    geolocaliseElement: Geolocation | undefined;
    constructor(map: Map, view: View, geolociliseElement: Geolocation | undefined);
    centerMap(): void;
}
