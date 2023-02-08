import Map from 'ol/Map';
import { Vector } from 'ol/source';
import { Vector as VectorLayer } from 'ol/layer';
import { Geometry } from 'ol/geom';
import IOption from '../utils/options';
export default class SingleSelect {
    constructor();
    parseToGeometry(json: string): Vector<Geometry>;
    displayDataOnMap(map: Map, json: string, vectorLayer: VectorLayer<Vector<Geometry>>, options: IOption): void;
    toogleDataSelection(map: Map, vectorLayer: VectorLayer<Vector<Geometry>>): void;
}
