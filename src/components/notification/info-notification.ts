import Control from "ol/control/Control";
import SVGCreator from '../../utils/svg-creator';

interface InfoConfiguration {
  textColor: string;
  backgroundColor: string;
}

interface InfoElement {
  configuration: InfoConfiguration;
  message: string;
}

export default class InfoNotification extends Control {
  
    constructor(infoConfiguration: InfoElement) {
      const element = document.createElement('div');
      const title = document.createElement('div');
      const titleText = document.createElement('div');
      titleText.innerHTML = infoConfiguration.message;
      const info = SVGCreator.infoCreator(infoConfiguration.configuration.textColor);
      element.className = 'notification-element';
      title.className = 'notification-title';
      titleText.className = 'notification-title-text';

      element.style.setProperty('--notification-background-color', infoConfiguration.configuration.backgroundColor)
      titleText.style.setProperty('--notification-text-color', infoConfiguration.configuration.textColor)

      title.appendChild(info);
      title.appendChild(titleText);
      
      element.appendChild(title);
  
      super({
        element: element,
      });

    }
  }
  