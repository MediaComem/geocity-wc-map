import { Map } from 'ol';
import GeoJSON from 'ol/format/GeoJSON';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Stroke, Style } from 'ol/style';
import CircleStyle from 'ol/style/Circle';

export default class GeojsonLoader {
  map: Map;
  data: Object = {};
  vectorSource: VectorSource = new VectorSource();
  vectorLayer: VectorLayer<VectorSource> = new VectorLayer();

  constructor(map: Map, url: string) {
    this.map = map;
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        this.vectorSource = new VectorSource({
          features: new GeoJSON().readFeatures(json),
        });
        this.vectorLayer = new VectorLayer({
          source: this.vectorSource,
          style: this.styleFunction,
        });
        this.map.addLayer(this.vectorLayer);
      });
  }

  styleFunction() {
    return new Style({
      image: new CircleStyle({
        radius: 5,
        fill: undefined,
        stroke: new Stroke({ color: 'red', width: 1 }),
      }),
    });
  }
}
