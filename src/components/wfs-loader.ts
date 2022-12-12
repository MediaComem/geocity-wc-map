import { Feature, Map } from 'ol';
import { Vector } from 'ol/source';
import { Vector as VectorLayer } from 'ol/layer';
import { Point } from 'ol/geom';

import { parse } from 'ol/xml';
import { Stroke, Style } from 'ol/style';
import CircleStyle from 'ol/style/Circle';

import proj4 from 'proj4';

export default class WFSLoader {
  map: Map;

  constructor(map: Map, url: string, projectionSource: string, projectionDefinition: string) {
    this.map = map;

    const vectorLayer = new VectorLayer({
      source: new Vector(),
    });

    const vectorSource = vectorLayer.getSource();

    this.map.addLayer(vectorLayer);

    proj4.defs('SR-ORG:6864', "+proj=merc +lon_0=0 +k=1 +x_0=0 +y_0=0 +a=6378137 +b=6378137 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs");
    proj4.defs(projectionSource, projectionDefinition);

    fetch(url)
      .then((response) => {
        return response.text();
      })
      .then((json) => {
        const xmlDoc = parse(json);
        const features = xmlDoc.getElementsByTagName(
          'wfs:FeatureCollection'
        )[0];
        const layers = features.getElementsByTagName('wfs:member');
        for (let i = 0; i < layers.length; i++) {
          const geom = layers[i].getElementsByTagName('ms:geom')[0];
          const point = geom.getElementsByTagName('gml:Point')[0];
          const pos = point.getElementsByTagName('gml:pos')[0];
          const coordinates = pos.innerHTML.split(" ");
          
          
          const newProjection = proj4('EPSG:2056', 'SR-ORG:6864', [Number(coordinates[0]), Number(coordinates[1])])
          const geomPoint = new Point(newProjection);
          const marker = new Feature(
            geomPoint
          );
          marker.setStyle(
            new Style({
              image: new CircleStyle({
                radius: 5,
                fill: undefined,
                stroke: new Stroke({ color: 'green', width: 1 }),
              }),
            })
          );
          vectorSource?.addFeature(marker);
        }
      });
  }
}
