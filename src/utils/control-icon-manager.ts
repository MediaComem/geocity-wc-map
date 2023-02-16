import { Control, FullScreen, Zoom } from 'ol/control';
import { useStore } from '../composable/store';
import SVGCreator from './svg-creator';
import GeolocationCenter from '../components/geolocation-center';
import ResetRotationControl from '../components/reset-rotation-control';
import InformationControl from '../components/information-control';
import GeoLayerControl from '../components/geo-layer-control';

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
    if (options.enableRotation)
      map.getView().on('change:rotation', (event) => {
        map.getControls().forEach((control) => {
          if (control instanceof ResetRotationControl) {
            map.removeControl(control);
          }
        });
        if (event.target.getRotation() !== 0) {
          map.addControl(new ResetRotationControl(leftControlIconContainer.div));
        }
      });
  }
}
