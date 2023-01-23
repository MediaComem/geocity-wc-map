import { Control } from 'ol/control'
import Geolocation from 'ol/Geolocation';

export default class GeolocationCenter extends Control {
    geolocaliseElement: Geolocation | undefined;

    constructor(geolociliseElement:Geolocation | undefined) {
      const button = document.createElement('button');
      button.innerHTML = 'C';
  
      const element = document.createElement('div');
      element.className = 'center-control ol-unselectable ol-control';
      element.appendChild(button);
  
      super({
        element: element,
      });
      this.geolocaliseElement = geolociliseElement;
      button.addEventListener('click', this.centerMap.bind(this), false);
    }
  
    centerMap() {
      if (this.geolocaliseElement) {
        const coordinate = this.geolocaliseElement.getPosition();
        const map = this.getMap();
        if (map) {
          const size = map.getSize();
          const view = map.getView();
          if (coordinate && size) view.centerOn(coordinate, size, [570, 500]);
        }
        
      }
    }
  }