import Control from 'ol/control/Control';
import wmtsLayerConfiguration from '../mapView/wmts-loader';
export default class LayerSelectionControl extends Control {
    constructor(wmts: Array<wmtsLayerConfiguration>);
    disable(): void;
    show(): void;
    hide(): void;
}
