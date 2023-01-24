import Map from 'ol/Map.js';
import Geolocation from 'ol/Geolocation';
import Feature from 'ol/Feature';
import Style from 'ol/style/Style';
import CircleStyle from 'ol/style/Circle';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import Point from 'ol/geom/Point';
import VectorLayer from 'ol/layer/Vector';
import Vector from 'ol/source/Vector';

export default class GeolocationMarker {
  map: Map;
  geolocation: Geolocation;

  vectorLayer = new VectorLayer();
  vectorSource = new Vector();

  removeMarker() {
    this.map.removeLayer(this.vectorLayer);
  }

  constructor(map: Map, geolocation: Geolocation) {
    this.map = map;
    this.geolocation = geolocation;

    const positionFeature = new Feature();
    positionFeature.setStyle(
      new Style({
        image: new CircleStyle({
          radius: 6,
          fill: new Fill({
            color: '#3399CC',
          }),
          stroke: new Stroke({
            color: '#fff',
            width: 2,
          }),
        }),
      })
    );

    geolocation.on('change:position', function () {
      const coordinates = geolocation.getPosition();
      positionFeature.setGeometry(
        coordinates ? new Point(coordinates) : undefined
      );
    });

    this.vectorSource?.addFeature(positionFeature);
    this.vectorLayer.setSource(this.vectorSource);
    this.map.addLayer(this.vectorLayer);
  }
}
