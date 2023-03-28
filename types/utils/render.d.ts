import { Feature, Map } from 'ol';
import VectorLayer from 'ol/layer/Vector';
import { Vector } from 'ol/source';
import { Geometry } from 'ol/geom';
import IStates from './states';
import { Store } from '../composable/store';
export declare class Render {
    vectorIsLoaded: Boolean;
    store: Store;
    constructor(store: Store);
    getDefaultZoomFactor(): number;
    setChangeResolution(map: Map, vectorLayer: VectorLayer<Vector<Geometry>>): void;
    setupAndLoadLayer(vectorSource: Vector<Geometry>): void;
    generateFeaturePointFromCoordinate(coordinates: number[]): Feature<Geometry>;
    displayCurrentElementCreateTargetMode(vectorSource: Vector<Geometry>, states: IStates): void;
    loadSelectMode(vectorSource: Vector<Geometry>, states: IStates): number[][];
    displayCurrentElementSelectMode(vectorSource: Vector<Geometry>, states: IStates): void;
    loadMixMode(vectorSourceSelect: Vector<Geometry>, vectorSourceCreate: Vector<Geometry>, states: IStates): void;
    displayMixMode(vectorSourceSelect: Vector<Geometry>, vectorSourceCreate: Vector<Geometry>, states: IStates): void;
}
