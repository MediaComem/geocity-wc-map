import Control from "ol/control/Control";

export default class Loader extends Control {
  
    constructor(message: string) {

      const element = document.createElement('div');
      const text = document.createElement('div');
      const loaderContainer = document.createElement('div');
      const loader = document.createElement('span');

      element.className = 'loader-element';
      loaderContainer.className = 'loader-container';
      loader.className = 'loader';
      text.className = 'loader-text';

      text.innerHTML = message;

      loaderContainer.appendChild(loader)
      element.appendChild(loaderContainer);
      element.appendChild(text);

      super({
        element: element,
      });

    }
  }