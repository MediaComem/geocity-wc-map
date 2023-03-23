/// <reference types="node" />
import { Vector } from 'ol/source';
import SelectCreateInformationBoxController from '../notification/select-create-information-box';
import { Map } from 'ol';
import { Render } from '../../utils/render';
import VectorSource from "ol/source/Vector.js";
import IStates from '../../utils/states';
export default class SingleCreate {
    control: SelectCreateInformationBoxController;
    private store;
    vectorSource: VectorSource;
    states: IStates;
    renderUtils: Render;
    constructor(mapElement: HTMLDivElement, renderUtils: Render, states: IStates);
    renderCurrentSelection(states: IStates): void;
    setupMapForCreation(map: Map, vectorSource: Vector): void;
    createElement(vectorSource: Vector, event: CustomEvent): void;
    deleteElement(vectorSource: Vector): void;
    addLongClickEvent(mapElement: HTMLDivElement, map: Map): void;
    requestElementCreation(x: number, y: number, map: Map, mapElement: HTMLDivElement): void;
    moveAnalyzer(startPosition: Array<number>, xPosition: number, yPosition: number): boolean;
    clearCreationTimeout(timeout: string | number | NodeJS.Timeout | undefined): void;
}
