import Control from "ol/control/Control";
import SVGCreator from '../../utils/svg-creator';

export default class WarningNotification extends Control {
  
    constructor(message: string) {
      const element = document.createElement('div');
      const title = document.createElement('div');
      const titleText = document.createElement('div');
      titleText.innerHTML = message;
      const warning = SVGCreator.warningCreator();
      element.className = 'warning-notification-element';
      title.className = 'warning-notification-title';
      titleText.className = 'warning-notification-title-text';
      
      title.appendChild(warning);
      title.appendChild(titleText);
      
      element.appendChild(title);
  
      super({
        element: element,
      });

    }
  }
  