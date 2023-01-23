import { Control } from 'ol/control';
import Geolocation from 'ol/Geolocation';
export default class GeolocationCenter extends Control {
    geolocaliseElement: Geolocation | undefined;
    constructor(geolociliseElement: Geolocation | undefined);
    centerMap(): void;
}
