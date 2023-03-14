/// <reference types="node" />
import { Vector } from 'ol/source';
import { Vector as VectorLayer } from 'ol/layer';
import SelectCreateInformationBoxController from '../notification/select-create-information-box';
import { Map } from 'ol';
import { Geometry } from 'ol/geom';
export default class SingleCreate {
    control: SelectCreateInformationBoxController;
    private store;
    constructor(mapElement: HTMLDivElement);
    setChangeResolution(map: Map, vectorLayer: VectorLayer<Vector<Geometry>>): void;
    setupMapForCreation(map: Map, vectorSource: Vector): void;
    createElement(vectorSource: Vector, event: CustomEvent): void;
    deleteElement(vectorSource: Vector): void;
    addLongClickEvent(mapElement: HTMLDivElement, map: Map): void;
    requestElementCreation(x: number, y: number, map: Map, mapElement: HTMLDivElement): void;
    moveAnalyzer(startPosition: Array<number>, xPosition: number, yPosition: number): boolean;
    clearCreationTimeout(timeout: string | number | NodeJS.Timeout | undefined): void;
}
