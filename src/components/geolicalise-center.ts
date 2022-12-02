import Map from 'ol/Map.js';
import View from 'ol/View.js';
import { Control } from 'ol/control'
import Geolocation from 'ol/Geolocation';

export default class GeolocaliseCenter extends Control {
    map:Map;
    view:View;
    geolocaliseElement: Geolocation | undefined;

    constructor(map:Map ,view:View, geolociliseElement:Geolocation | undefined) {
      const button = document.createElement('button');
      button.innerHTML = 'C';
  
      const element = document.createElement('div');
      element.className = 'center-control ol-unselectable ol-control';
      element.appendChild(button);
  
      super({
        element: element,
      });
      this.map = map;
      this.view = view;
      this.geolocaliseElement = geolociliseElement;
      button.addEventListener('click', this.centerMap.bind(this), false);
    }
  
    centerMap() {
      if (this.geolocaliseElement) {
        const coordinate = this.geolocaliseElement.getPosition();
        const size = this.map.getSize();
        if (coordinate && size) this.view.centerOn(coordinate, size, [570, 500]);
      }
    }
  }