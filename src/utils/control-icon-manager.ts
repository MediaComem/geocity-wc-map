import { FullScreen, Zoom } from 'ol/control';
import { useStore } from '../composable/store';
import SVGCreator from './svg-creator';
import GeolocationCenter from '../components/geolocation-center';
import ResetRotationControl from '../components/reset-rotation-control';
import InformationControl from '../components/information-control';

export default class ControlIconManager {
  static setupIcon() {
    const options = useStore().getOptions();
    const map = useStore().getMap()
    map.addControl(new InformationControl());
    
    if (options.fullscreen)
      map.addControl(
        new FullScreen({
          label: SVGCreator.fullScreenLabel(),
          labelActive: SVGCreator.fullScreenLabelActive(),
          className: `ol-full-screen`,
        })
      );

    if (options.displayZoom)
      map.addControl(
        new Zoom({
          zoomInLabel: SVGCreator.zoomInLabel(),
          zoomOutLabel: SVGCreator.zoomOutLabel(),
          className: `ol-zoom`,
        })
      );

    if (options.enableCenterButton)
      map.addControl(new GeolocationCenter());
    if (options.enableRotation)
      map.getView().on('change:rotation', (event) => {
        map.getControls().forEach((control) => {
          if (control instanceof ResetRotationControl) {
            map.removeControl(control);
          }
        });
        if (event.target.getRotation() !== 0) {
          map.addControl(new ResetRotationControl());
        }
      });
  }
}
