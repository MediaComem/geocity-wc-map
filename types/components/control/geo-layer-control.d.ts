import Control from 'ol/control/Control';
import { Map } from 'ol';
import LayerSelectionControl from './layer-selection';
import wmtsLayerConfiguration from '../mapView/wmts-loader';
export default class GeoLayerControl extends Control {
    isOpen: Boolean;
    layerSelection: LayerSelectionControl;
    constructor(target: HTMLElement, map: Map, wmts: Array<wmtsLayerConfiguration>);
    toogleSelection(): void;
    close(): void;
}
