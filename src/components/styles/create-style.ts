import { Fill, Stroke, Style } from 'ol/style';
import CircleStyle from 'ol/style/Circle';

export default class CreateStyle {
  static setupSingleClick(zoomFactor: number) {
    return new Style({
      zIndex: 1,
      image: new CircleStyle({
        radius: 2 * zoomFactor,
        stroke: new Stroke({
          color: '#FFFFFF',
          width: 3,
        }),
        fill: new Fill({
          color: 'rgb(239, 68, 68, 0.75)',
        }),
      }),
    });
  }

  static setupSingleClickCenterCircle(zoomFactor: number) {
    return new Style({
      zIndex: 2,
      image: new CircleStyle({
        radius: 0.2 * zoomFactor,
        stroke: new Stroke({
          color: '#FFFFFF',
          width: 3,
        }),
        fill: new Fill({
          color: '#DC2626',
        }),
      }),
    });
  }
}
