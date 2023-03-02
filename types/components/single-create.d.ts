/// <reference types="node" />
import { Vector } from 'ol/source';
import SelectCreateInformationBoxController from './select-create-information-box';
import { Map } from 'ol';
export default class SingleCreate {
    control: SelectCreateInformationBoxController;
    private store;
    constructor(mapElement: HTMLDivElement);
    setupMapForCreation(map: Map, vectorSource: Vector): void;
    createElement(vectorSource: Vector, event: CustomEvent): void;
    deleteElement(vectorSource: Vector): void;
    addLongClickEvent(mapElement: HTMLDivElement, map: Map): void;
    requestElementCreation(x: number, y: number, map: Map, mapElement: HTMLDivElement): void;
    moveAnalyzer(startPosition: Array<number>, xPosition: number, yPosition: number): boolean;
    clearCreationTimeout(timeout: string | number | NodeJS.Timeout | undefined): void;
}
