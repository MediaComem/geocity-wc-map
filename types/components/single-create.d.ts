import Feature from 'ol/Feature';
import { Vector } from 'ol/source';
import { Map } from 'ol';
export default class SingleCreate {
    currentFeature: Feature | undefined;
    constructor(mapElement: HTMLDivElement);
    setupMapForCreation(map: Map, vectorSource: Vector): void;
    setupCreateElement(map: Map, vectorSource: Vector): void;
    setupDeleteElement(map: Map, vectorSource: Vector): void;
    longClickEvent(mapElement: HTMLDivElement, map: Map): void;
}
