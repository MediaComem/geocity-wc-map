import { Feature } from 'ol';
import Map from 'ol/Map';
import { Cluster, Vector } from 'ol/source';
import { Vector as VectorLayer } from 'ol/layer';
import { Geometry } from 'ol/geom';
import VectorSource from "ol/source/Vector.js";
import SelectCreateInformationBoxController from '../notification/select-create-information-box';
import IOption from '../../utils/options';
export default class SingleSelect {
    control: SelectCreateInformationBoxController;
    private store;
    constructor();
    setChangeResolution(map: Map, clusterSource: Cluster, options: IOption): void;
    displayDataOnMap(map: Map, vectorLayer: VectorLayer<Vector<Geometry>>, options: IOption, vectorSource: VectorSource): void;
    setCurrentElement(feature: Feature): void;
    setIconToDisplay(feature: Feature, state: any): void;
    removeSelectedItem(feature: Feature): void;
    removeItem(feature: Feature): void;
    setInformationBox(feature: Feature): void;
    toogleDataSelection(vectorLayer: VectorLayer<Vector<Geometry>>): void;
}
