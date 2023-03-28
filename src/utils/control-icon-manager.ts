import { Control, FullScreen, Zoom } from 'ol/control';
import { Store } from '../composable/store';
import SVGCreator from './svg-creator';
import GeolocationCenter from '../components/control/geolocation-center';
import ResetRotationControl from '../components/control/reset-rotation-control';
import InformationControl from '../components/control/information-control';
import GeoLayerControl from '../components/control/geo-layer-control';
import { Map } from 'ol';
import EventManager from './event-manager';
import { EventTypes } from 'ol/Observable';
import BaseEvent from 'ol/events/Event';
import IStates from './states';

class ControlIconContainer extends Control {
  public div: HTMLElement;

  constructor(className: string) {
    const element = document.createElement('div');
    element.className = className;

    super({
      element: element,
    });

    this.div = element;
  }
}

export default class ControlIconManager {
  static setupIcon(states: IStates, store: Store) {
    const options = store.getOptions();
    const readonly = states.readonly;
    const map = store.getMap();

    if(!map) {
      throw new Error ("Missing map!");
    }

    const leftControlIconContainer = new ControlIconContainer('left-buttons-control-container');
    map.addControl(leftControlIconContainer);
    const rightControlIconContainer = new ControlIconContainer('right-buttons-control-container');
    map.addControl(rightControlIconContainer);

    if (!readonly)
      map.addControl(new InformationControl(rightControlIconContainer.div, store, map));

    if (options?.interaction.fullscreen)
      map.addControl(
        new FullScreen({
          label: SVGCreator.fullScreenLabel(),
          labelActive: SVGCreator.fullScreenLabelActive(),
          className: `ol-full-screen`,
          target: rightControlIconContainer.div,
        })
      );

    map.addControl(new GeoLayerControl(rightControlIconContainer.div, map, options?.wmts ?? []));

    if (options?.interaction.displayZoom)
      map.addControl(
        new Zoom({
          zoomInLabel: SVGCreator.zoomInLabel(),
          zoomOutLabel: SVGCreator.zoomOutLabel(),
          className: `ol-zoom`,
          target: leftControlIconContainer.div,
        })
      );

    if (options?.interaction.enableCenterButton && !readonly)
      map.addControl(new GeolocationCenter(leftControlIconContainer.div));

    if (options?.interaction.enableRotation)
      EventManager.registerBorderConstaintMapEvent(
        'change:rotation' as EventTypes,
        (event) => setRotationChange(map, event, leftControlIconContainer.div),
        map,
        options
      );
  }
}
function setRotationChange(map: Map, event: BaseEvent, div: HTMLElement) {
  map.getControls().forEach((control) => {
    if (control instanceof ResetRotationControl) {
      map.removeControl(control);
    }
  });
  if (event.target.getRotation() !== 0) {
    map.addControl(new ResetRotationControl(div, map));
  }
}

