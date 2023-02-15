import Map from 'ol/Map';
import { Vector } from 'ol/source';
import { Vector as VectorLayer } from 'ol/layer';
import { Geometry } from 'ol/geom';
import SelectCreateInformationBoxController from './select-create-information-box';
import IOption from '../utils/options';
export default class SingleSelect {
    control: SelectCreateInformationBoxController;
    constructor();
    parseToGeometry(json: string): Vector<Geometry>;
    displayDataOnMap(map: Map, json: string, vectorLayer: VectorLayer<Vector<Geometry>>, options: IOption): void;
    toogleDataSelection(vectorLayer: VectorLayer<Vector<Geometry>>): void;
}
