import Control from 'ol/control/Control';
import LayerSelectionControl from './layer-selection';
export default class GeoLayerControl extends Control {
    isOpen: Boolean;
    layerSelection: LayerSelectionControl;
    constructor(target: HTMLElement);
    toogleSelection(): void;
    close(): void;
}
