import { Map } from 'ol';
import { Control } from 'ol/control';
import InformationElement from '../types/information-element';
export default class InformationBox extends Control {
    map: Map;
    constructor(map: Map, information: InformationElement);
    closeBox(): void;
}
