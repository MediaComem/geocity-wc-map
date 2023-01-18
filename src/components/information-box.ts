import { Control } from 'ol/control';
import InformationElement from '../types/information-element';
import { GeocityEvent } from '../utils/geocity-event';
import SVGCreator from '../utils/svg-creator';

export default class InformationBox extends Control {
  interval: any;

  constructor(information: InformationElement) {

    const element = document.createElement('div');
    const title = document.createElement('div');
    const titleText = document.createElement('div');
    titleText.innerHTML = information.title
    const cross = SVGCreator.crossCreator();
    const content = document.createElement('div');
    content.innerHTML = information.content
    const progress = document.createElement('div');
    element.className = 'custom-popup-element';
    element.style.setProperty('--progress-width', '100%');
    title.className = 'custom-popup-title';
    titleText.className = 'custom-popup-title-text';
    content.className = 'custom-popup-content';
    progress.className = 'custom-progress-element'
    title.appendChild(titleText);
    title.appendChild(cross);
    element.appendChild(title);
    element.appendChild(content);
    element.appendChild(progress);

    super({
      element: element,
    });

    cross.addEventListener('click', this.closeBox.bind(this), true);
    const intervalDuration = information.duration / 100;
    let width = 100;
    this.interval = setInterval(() => {
      if (width > 0) {
        width--;
        element.style.setProperty('--progress-width', width + '%');
      } else {
        this.closeBox();
      }
    }, intervalDuration * 1000);
    window.addEventListener('clear-information-box-interval', this.clear.bind(this), true);
  }

  clear() {
    clearInterval(this.interval);
  }

  closeBox() {
    this.clear();
    GeocityEvent.sendEvent('close-information-box', {});
  }
}
