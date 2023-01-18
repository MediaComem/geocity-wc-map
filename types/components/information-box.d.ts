import { Control } from 'ol/control';
import InformationElement from '../types/information-element';
export default class InformationBox extends Control {
    interval: any;
    constructor(information: InformationElement);
    clear(): void;
    closeBox(): void;
}
