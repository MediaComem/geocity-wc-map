import { Control, FullScreen, Zoom } from 'ol/control';
import { useStore } from '../composable/store';
import SVGCreator from './svg-creator';
import GeolocationCenter from '../components/control/geolocation-center';
import ResetRotationControl from '../components/control/reset-rotation-control';
import InformationControl from '../components/control/information-control';
import GeoLayerControl from '../components/control/geo-layer-control';
import { Map } from 'ol';
import { ObjectEvent } from 'ol/Object';

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
  static setupIcon() {
    const options = useStore().getOptions();
    const map = useStore().getMap()

    const leftControlIconContainer = new ControlIconContainer('left-buttons-control-container');
    map.addControl(leftControlIconContainer);
    const rightControlIconContainer = new ControlIconContainer('right-buttons-control-container');
    map.addControl(rightControlIconContainer);

    map.addControl(new InformationControl(rightControlIconContainer.div));
    if (options.fullscreen)
      map.addControl(
        new FullScreen({
          label: SVGCreator.fullScreenLabel(),
          labelActive: SVGCreator.fullScreenLabelActive(),
          className: `ol-full-screen`,
          target: rightControlIconContainer.div,
        })
      );
    
    map.addControl(new GeoLayerControl(rightControlIconContainer.div));

    if (options.displayZoom)
      map.addControl(
        new Zoom({
          zoomInLabel: SVGCreator.zoomInLabel(),
          zoomOutLabel: SVGCreator.zoomOutLabel(),
          className: `ol-zoom`,
          target: leftControlIconContainer.div,
        })
      );

    if (options.enableCenterButton)
      map.addControl(new GeolocationCenter(leftControlIconContainer.div));
    if (options.enableRotation) {
      if (options.border.url !== '') {
        window.addEventListener('border-contraint-enabled', () => {
          useStore().getMap().getView().un('change:rotation', (event) => setRotationChange(map, event, leftControlIconContainer.div))
          useStore().getMap().getView().on('change:rotation', (event) => setRotationChange(map, event, leftControlIconContainer.div))
        })
      }
      map.getView().on('change:rotation', (event) => setRotationChange(map, event, leftControlIconContainer.div));
    }
      
  }
}
function setRotationChange(map: Map, event: ObjectEvent, div: HTMLElement) {
  map.getControls().forEach((control) => {
    if (control instanceof ResetRotationControl) {
      map.removeControl(control);
    }
  });
  if (event.target.getRotation() !== 0) {
    map.addControl(new ResetRotationControl(div));
  }
}

