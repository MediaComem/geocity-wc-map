import Control from "ol/control/Control";
import Map from 'ol/Map.js';
import View from "ol/View";
export default class ResetRotationControl extends Control {
    map: Map;
    view: View;
    constructor(map: Map, view: View);
    resetRotation(): void;
}
