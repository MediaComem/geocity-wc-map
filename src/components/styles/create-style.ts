import { FeatureLike } from 'ol/Feature';
import { Fill, Stroke, Style } from 'ol/style';
import CircleStyle from 'ol/style/Circle';

export default class CreateStyle {
  static setupCircles(
    feature: FeatureLike,
    zoomFactor: number
  ) {
    let style: Array<Style> = [];
    if (feature.get('isSelected')) {
      style = [
        new Style({
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
        }),
        new Style({
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
        }),
      ];
    } else {
      style = [
        new Style({
          zIndex: 1,
          image: new CircleStyle({
            radius: 2 * zoomFactor,
            stroke: new Stroke({
              color: '#FFFFFF',
              width: 1,
            }),
            fill: new Fill({
              color: 'rgb(239, 68, 68, 0.75)',
            }),
          }),
        }),
        new Style({
          zIndex: 2,
          image: new CircleStyle({
            radius: 0.2 * zoomFactor,
            stroke: new Stroke({
              color: '#FFFFFF',
              width: 1,
            }),
            fill: new Fill({
              color: '#DC2626',
            }),
          }),
        }),
      ];
    }
    return style;
  }
}
