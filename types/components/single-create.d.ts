/// <reference types="node" />
import Feature from 'ol/Feature';
import { Vector } from 'ol/source';
import { Map } from 'ol';
export default class SingleCreate {
    currentFeature: Feature | undefined;
    constructor(mapElement: HTMLDivElement);
    setupMapForCreation(map: Map, vectorSource: Vector): void;
    createElement(map: Map, vectorSource: Vector): void;
    deleteElement(map: Map, vectorSource: Vector): void;
    addLongClickEvent(mapElement: HTMLDivElement, map: Map): void;
    reqiestElementCreation(x: number, y: number, map: Map, mapElement: HTMLDivElement): void;
    moveAnalyzer(timeout: string | number | NodeJS.Timeout | undefined, move: number): void;
    clearCreationTimeout(timeout: string | number | NodeJS.Timeout | undefined): void;
}
