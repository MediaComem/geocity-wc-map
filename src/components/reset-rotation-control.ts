import Control from "ol/control/Control";
import Map from 'ol/Map.js';
import View from "ol/View";

export default class ResetRotationControl extends Control {
    map:Map;
    view:View;

    constructor(map:Map, view:View) {
        const button = document.createElement('button');
        button.innerHTML = 'R';
    
        const element = document.createElement('div');
        element.className = 'center-control ol-unselectable ol-control';
        element.appendChild(button);
    
        super({
            element: element,
        });
        this.map = map;
        this.view = view;
        button.addEventListener('click', this.resetRotation.bind(this), false);
    }

    resetRotation() {
        this.view.setRotation(0);
    }
}