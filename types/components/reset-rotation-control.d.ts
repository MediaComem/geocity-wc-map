import Control from "ol/control/Control";
export default class ResetRotationControl extends Control {
    constructor(theme: string, customPosition: boolean);
    resetRotation(): void;
}
