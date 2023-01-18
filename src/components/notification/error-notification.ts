import Control from "ol/control/Control";
import SVGCreator from '../../utils/svg-creator';

interface ErrorConfiguration {
  textColor: string;
  backgroundColor: string;
}

interface ErrorElement {
  configuration: ErrorConfiguration;
  message: string;
}

export default class ErrorNotification extends Control {
  
    constructor(errorConfiguration: ErrorElement) {
      const element = document.createElement('div');
      const title = document.createElement('div');
      const titleText = document.createElement('div');
      titleText.innerHTML = errorConfiguration.message;
      const error = SVGCreator.errorCreator(errorConfiguration.configuration.textColor);
      element.className = 'notification-element';
      title.className = 'notification-title';
      titleText.className = 'notification-title-text';

      element.style.setProperty('--notification-background-color', errorConfiguration.configuration.backgroundColor)
      titleText.style.setProperty('--notification-text-color', errorConfiguration.configuration.textColor)

      title.appendChild(error);
      title.appendChild(titleText);
      
      element.appendChild(title);
  
      super({
        element: element,
      });

    }
  }
  