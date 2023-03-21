import { Feature, Map } from 'ol';
import VectorLayer from 'ol/layer/Vector';
import { Vector } from 'ol/source';
import { Geometry } from 'ol/geom';
export declare class Render {
    static getDefaultZoomFactor(): number;
    static setChangeResolution(map: Map, vectorLayer: VectorLayer<Vector<Geometry>>): void;
    static setupAndLoadLayer(vectorSource: Vector<Geometry>): void;
    static generateFeaturePointFromCoordinate(coordinates: number[]): Feature<Geometry>;
    static displayCurrentElementCreateTargetMode(vectorSource: Vector<Geometry>): void;
    static displayCurrentElementSelectMode(vectorSource: Vector<Geometry>): void;
}
