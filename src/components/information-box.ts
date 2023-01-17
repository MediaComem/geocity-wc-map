import { Map } from 'ol';
import { Control } from 'ol/control';
import InformationElement from '../types/information-element';
import { GeocityEvent } from '../utils/geocity-event';
import SVGCreator from '../utils/svg-creator';

export default class InformationBox extends Control {
  map: Map;

  constructor(map: Map, information: InformationElement) {
    const element = document.createElement('div');
    const title = document.createElement('div');
    const titleText = document.createElement('div');
    titleText.innerHTML = information.title
    const cross = SVGCreator.crossCreator();
    const content = document.createElement('div');
    content.innerHTML = information.content
    element.className = 'custom-popup-element';
    title.className = 'custom-popup-title';
    titleText.className = 'custom-popup-title-text';
    content.className = 'custom-popup-content';
    title.appendChild(titleText);
    title.appendChild(cross);
    element.appendChild(title);
    element.appendChild(content);

    super({
      element: element,
    });

    this.map = map;
    cross.addEventListener('click', this.closeBox.bind(this), true);
  }

  closeBox() {
    GeocityEvent.sendEvent('close-information-box', {});
  }
}
