import { Control } from 'ol/control';
import GeolocationInformation from '../types/geolocation-information';
export default class LightInformationBoxController extends Control {
    constructor(defaultPosition: Array<number>, geolocationInformation: GeolocationInformation);
}
