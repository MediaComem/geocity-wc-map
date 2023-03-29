import Control from "ol/control/Control";
import { Map } from "ol";
export default class ResetRotationControl extends Control {
    map: Map;
    constructor(target: HTMLElement, map: Map);
    resetRotation(): void;
}
