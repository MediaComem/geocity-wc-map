/// <reference types="node" />
import Feature from 'ol/Feature';
import { Vector } from 'ol/source';
import { Store } from '../../composable/store';
import SelectCreateInformationBoxController from '../notification/select-create-information-box';
import { Map } from 'ol';
import { Render } from '../../utils/render';
import VectorSource from "ol/source/Vector.js";
import IStates from '../../utils/states';
import InclusionArea from '../constraint/inclusion-area';
export default class SingleCreate {
    control: SelectCreateInformationBoxController;
    private store;
    vectorSource: VectorSource;
    states: IStates;
    renderUtils: Render;
    inclusionArea: InclusionArea | undefined;
    map: Map;
    previousElement: Feature | undefined;
    constructor(mapElement: HTMLDivElement, inclusionArea: InclusionArea | undefined, renderUtils: Render, states: IStates, store: Store);
    renderCurrentSelection(states: IStates): void;
    removeCurrentSelection(): void;
    setupMapForCreation(map: Map, vectorSource: Vector): void;
    createElement(vectorSource: Vector, event: CustomEvent): void;
    remove(vectorSource: Vector, feature: Feature): void;
    deleteElement(vectorSource: Vector): void;
    addLongClickEvent(mapElement: HTMLDivElement, map: Map): void;
    requestElementCreation(x: number, y: number, map: Map, mapElement: HTMLDivElement): void;
    moveAnalyzer(startPosition: Array<number>, xPosition: number, yPosition: number): boolean;
    clearCreationTimeout(timeout: string | number | NodeJS.Timeout | undefined): void;
}
