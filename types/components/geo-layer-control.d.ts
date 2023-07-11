import Control from 'ol/control/Control';
import LayerSelectionControl from './layer-selection';
import { Map } from 'ol';

export default class GeoLayerControl extends Control {
    isOpen: Boolean;
    layerSelection: LayerSelectionControl;
    constructor(target: HTMLElement, map: Map);
    toogleSelection(): void;
    close(): void;
}
