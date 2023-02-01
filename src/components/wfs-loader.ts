import { Feature, Map } from 'ol';
import { Cluster, Vector } from 'ol/source';
import { Vector as VectorLayer } from 'ol/layer';
import { Point } from 'ol/geom';

import { parse } from 'ol/xml';
import { Fill, Icon, Stroke, Style, Text } from 'ol/style';
import CircleStyle from 'ol/style/Circle';

import proj4 from 'proj4';
import { GeocityEvent } from '../utils/geocity-event';
import SVGCreator from '../utils/svg-creator';

interface ClusterOptions {
  distance: number;
  minDistance: number;
}

export default class WFSLoader {
  map: Map;

  constructor(map: Map, url: string, projectionSource: string, projectionDefinition: string, clusterOptions: ClusterOptions) {
    this.map = map;

    const vectorLayer = new VectorLayer();
    const vectorSource = new Vector;


    proj4.defs(
      'EPSG:3857',
      '+proj=merc +a=6378137 +b=6378137 +lat_ts=0 +lon_0=0 +x_0=0 +y_0=0 +k=1 +units=m +nadgrids=@null +wktext +no_defs +type=crs'
    );
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
          const marker = new Feature({
            geometry: geomPoint,
            name: i,
            myCustomeValue: layers[i]
          });
          vectorSource?.addFeature(marker);
        }
        
        const clusterSource = new Cluster({
          distance: clusterOptions.distance,
          minDistance: clusterOptions.minDistance,
          source: vectorSource,
        });
        
        vectorLayer.setSource(clusterSource)
        const styleCache: Style[] = [];
        vectorLayer.setStyle(function (feature) {
          const size = feature.get('features').length;
          let style = styleCache[size];
          if (!style) {
            if (size === 1) {
              style = new Style({
                image: new Icon({
                  src: 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent( SVGCreator.mapPin ),
                  // the svg height is 54px. It's the reason why the anchor is set like that
                  anchor: [0.5, 54],
                  anchorXUnits: 'fraction',
                  anchorYUnits: 'pixels',
                })
              })
            } else {
              style = new Style({
                image: new CircleStyle({
                  radius: 10,
                  stroke: new Stroke({
                    color: '#fff',
                  }),
                  fill: new Fill({
                    color: '#334155',
                  }),
                }),
                text: new Text({
                  text: size.toString(),
                  fill: new Fill({
                    color: '#fff',
                  }),
                }),
              });
            }
            
            styleCache[size] = style;
          }
          return style;
        },)
        this.map.addLayer(vectorLayer);
        this.map.on('click', function (evt) {
          const feature = map.forEachFeatureAtPixel(evt.pixel, function (feature) {
            return feature;
          });
          if (!feature) {
            return;
          }
          GeocityEvent.sendEvent('geocity-wfs-event', feature);
        });

      });
  }
}
