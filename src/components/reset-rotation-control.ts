import Control from "ol/control/Control";

export default class ResetRotationControl extends Control {

    constructor() {
        const button = document.createElement('button');
        button.innerHTML = 'R';
    
        const element = document.createElement('div');
        element.className = 'center-control ol-unselectable ol-control';
        element.appendChild(button);
    
        super({
            element: element,
        });
        button.addEventListener('click', this.resetRotation.bind(this), false);
    }

    resetRotation() {
        this.getMap()?.getView().setRotation(0);
    }
}