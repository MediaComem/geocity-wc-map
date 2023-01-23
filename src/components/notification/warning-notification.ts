import Control from "ol/control/Control";
import SVGCreator from '../../utils/svg-creator';

interface WarningConfiguration {
  textColor: string;
  backgroundColor: string;
}

interface WarningElement {
  configuration: WarningConfiguration;
  message: string;
}

export default class WarningNotification extends Control {
  
    constructor(warningConfiguration: WarningElement) {
      const element = document.createElement('div');
      const title = document.createElement('div');
      const titleText = document.createElement('div');
      titleText.innerHTML = warningConfiguration.message;
      const warning = SVGCreator.warningCreator(warningConfiguration.configuration.textColor);
      element.className = 'notification-element';
      title.className = 'notification-title';
      titleText.className = 'notification-title-text';

      element.style.setProperty('--notification-background-color', warningConfiguration.configuration.backgroundColor)
      titleText.style.setProperty('--notification-text-color', warningConfiguration.configuration.textColor)

      title.appendChild(warning);
      title.appendChild(titleText);
      
      element.appendChild(title);
  
      super({
        element: element,
      });

    }
  }
  