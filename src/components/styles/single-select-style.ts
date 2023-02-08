import { Feature } from 'ol';
import { FeatureLike } from 'ol/Feature';
import { Style, Icon, Stroke, Fill, Text } from 'ol/style';
import CircleStyle from 'ol/style/Circle';
import SVGCreator from '../../utils/svg-creator';

export default class SingleSelectStyle {
  static clusterWithIcon(feature: FeatureLike) {
    const size = feature.get('features').length;
    let style;
    if (size === 1 && feature.get('features')[0].get('isClick')) {
      style = new Style({
        zIndex: 1,
        image: new Icon({
          src:
            'data:image/svg+xml;charset=utf-8,' +
            encodeURIComponent(SVGCreator.mapPinSelect),
          // the svg height is 54px. It's the reason why the anchor is set like that
          anchor: [0.5, 54],
          anchorXUnits: 'fraction',
          anchorYUnits: 'pixels',
        }),
      });
    } else if (size === 1 && !feature.get('features')[0].get('isClick')) {
      style = new Style({
        zIndex: 1,
        image: new Icon({
          src:
            'data:image/svg+xml;charset=utf-8,' +
            encodeURIComponent(SVGCreator.mapPin),
          // the svg height is 54px. It's the reason why the anchor is set like that
          anchor: [0.5, 54],
          anchorXUnits: 'fraction',
          anchorYUnits: 'pixels',
        }),
      });
    } else if (feature.get('features').find((f: Feature) => f.get('isClick'))) {
      style = new Style({
        image: new CircleStyle({
          radius: 15,
          stroke: new Stroke({
            color: '#fff',
          }),
          fill: new Fill({
            color: '#EF4444',
          }),
        }),
        text: new Text({
          text: size.toString(),
          font: '14px sans-serif',
          fill: new Fill({
            color: '#fff',
          }),
        }),
      });
    } else {
      style = new Style({
        image: new CircleStyle({
          radius: 15,
          stroke: new Stroke({
            color: '#fff',
          }),
          fill: new Fill({
            color: '#334155',
          }),
        }),
        text: new Text({
          text: size.toString(),
          font: '14px sans-serif',
          fill: new Fill({
            color: '#fff',
          }),
        }),
      });
    }
    return style;
  }
}
