import proj4 from 'proj4';

import Map from 'ol/Map.js';
import { parse } from 'ol/xml';
import Feature from 'ol/Feature';
import { Coordinate } from 'ol/coordinate';
import { Vector } from 'ol/source';
import { MultiPolygon, Polygon } from 'ol/geom';
import VectorLayer from 'ol/layer/Vector';
import { Stroke, Style } from 'ol/style';
import { GeocityEvent } from '../utils/geocity-event';

export default class InclusionArea {
  constructor(
    map: Map,
    url: string,
    projectionSource: string,
    projectionDefinition: string
  ) {
    proj4.defs(
      'EPSG:3857',
      '+proj=merc +a=6378137 +b=6378137 +lat_ts=0 +lon_0=0 +x_0=0 +y_0=0 +k=1 +units=m +nadgrids=@null +wktext +no_defs +type=crs'
    );
    proj4.defs(
      'SR-ORG:6864',
      '+proj=merc +lon_0=0 +k=1 +x_0=0 +y_0=0 +a=6378137 +b=6378137 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs'
    );
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
        const vectorSource = new Vector();
        const polygons = [];
        for (let i = 0; i < layers.length; i++) {
          const portail = layers[i].getElementsByTagName(
            'ms:MO_bf_bien_fonds'
          )[0];
          
          const geom = portail.getElementsByTagName('ms:geom')[0];
          const poligone = geom.getElementsByTagName('gml:Polygon')[0];
          const exterior = poligone.getElementsByTagName('gml:exterior')[0];
          const ring = exterior.getElementsByTagName('gml:LinearRing')[0];
          const pos = ring.getElementsByTagName('gml:posList')[0];
          const coordinates = pos.innerHTML.split(' ');
          const newCoordinates = [];
          for (let i = 0; i < coordinates.length; i++) {
            if (i % 2 === 1) {
              newCoordinates.push(
                proj4(projectionSource, 'SR-ORG:6864', [
                  Number(coordinates[i - 1]),
                  Number(coordinates[i]),
                ]) as Coordinate
              );
            }
          }

          polygons.push(new Polygon([newCoordinates]));

        }
        const marker = new Feature({
          geometry: new MultiPolygon(polygons),
        });
        vectorSource.addFeature(marker);
        const vectorLayer = new VectorLayer({
          source: vectorSource,
          visible: true,
          style: new Style({
            stroke: new Stroke({
              color: 'red',
              width: 1,
            }),
          }),
        });
        map.getLayers().insertAt(1, vectorLayer);

        window.addEventListener('current-center-position', ((
          event: CustomEvent
        ) => {
          const nearestPoint = vectorSource.getClosestFeatureToCoordinate(
            event.detail
          );
          if (nearestPoint.getGeometry()?.getType() === 'MultiPolygon') {
            const polygon = nearestPoint.getGeometry();
            GeocityEvent.sendEvent('inclusion-area-included', polygon?.intersectsCoordinate(event.detail));
          }
        }) as EventListener);
      });
  }
}
