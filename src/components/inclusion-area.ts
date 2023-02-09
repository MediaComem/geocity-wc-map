import { parse } from 'ol/xml';
import Feature from 'ol/Feature';
import { Vector } from 'ol/source';
import { MultiPolygon, Polygon } from 'ol/geom';
import VectorLayer from 'ol/layer/Vector';
import { Stroke, Style } from 'ol/style';
import { GeocityEvent } from '../utils/geocity-event';
import { useStore } from '../composable/store';

export default class InclusionArea {
  constructor() {
    fetch(useStore().getOptions().inclusionArea)
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
          if (
            (portail.getElementsByTagName('ms:genre')[0].innerHTML ===
              'Domaine public communal' ||
              portail.getElementsByTagName('ms:genre')[0].innerHTML ===
                'Domaine public cantonal') &&
            portail.getElementsByTagName('ms:commune')[0].innerHTML ===
              'Yverdon-les-Bains'
          ) {
            const geom = portail.getElementsByTagName('ms:geom')[0];
            const poligone = geom.getElementsByTagName('gml:Polygon')[0];
            const exterior = poligone.getElementsByTagName('gml:exterior')[0];
            const ring = exterior.getElementsByTagName('gml:LinearRing')[0];
            const pos = ring.getElementsByTagName('gml:posList')[0];
            const coordinates = pos.innerHTML.split(' ');
            const newCoordinates = [];
            for (let i = 0; i < coordinates.length; i++) {
              if (i % 2 === 1) {
                newCoordinates.push([Number(coordinates[i - 1]),Number(coordinates[i])]);
              }
            }

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
        useStore().getMap().getLayers().insertAt(1, vectorLayer);

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
