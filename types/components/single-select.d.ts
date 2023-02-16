import Map from 'ol/Map';
import { Vector } from 'ol/source';
import { Vector as VectorLayer } from 'ol/layer';
import { Geometry } from 'ol/geom';
import VectorSource from "ol/source/Vector.js";
import SelectCreateInformationBoxController from './select-create-information-box';
import IOption from '../utils/options';
export default class SingleSelect {
    control: SelectCreateInformationBoxController;
    constructor();
    displayDataOnMap(map: Map, vectorLayer: VectorLayer<Vector<Geometry>>, options: IOption, vectorSource: VectorSource): void;
    toogleDataSelection(vectorLayer: VectorLayer<Vector<Geometry>>): void;
}
