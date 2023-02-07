import { Feature, Map } from 'ol';
import { Cluster, Vector } from 'ol/source';
import { Vector as VectorLayer } from 'ol/layer';
import { Circle, Point } from 'ol/geom';

import { parse } from 'ol/xml';
import { Fill, Icon, Stroke, Style, Text } from 'ol/style';
import CircleStyle from 'ol/style/Circle';

import proj4 from 'proj4';
import { GeocityEvent } from '../utils/geocity-event';
import SVGCreator from '../utils/svg-creator';
import ModeConfig from '../types/mode';
import SelectInformationBoxController from './select-information-box';

interface ClusterOptions {
  distance: number;
  minDistance: number;
}

export default class WFSLoader {
  map: Map;

  constructor(map: Map, url: string, projectionSource: string, projectionDefinition: string, clusterOptions: ClusterOptions, mode: ModeConfig) {
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
            myCustomeValue: layers[i],
            isClick: false,
          });
          vectorSource?.addFeature(marker);
        }
        
        const clusterSource = new Cluster({
          distance: clusterOptions.distance,
          minDistance: clusterOptions.minDistance,
          source: vectorSource,
        });
        
        vectorLayer.setSource(clusterSource)
        vectorLayer.setStyle(function (feature) {
          const size = feature.get('features').length;
          let style;
          if(size === 1 && feature.get('features')[0].get('isClick'))
            {
              style = new Style({
                zIndex: 1,
                image: new Icon({
                  src: 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent( SVGCreator.mapPinSelect ),
                  // the svg height is 54px. It's the reason why the anchor is set like that
                  anchor: [0.5, 54],
                  anchorXUnits: 'fraction',
                  anchorYUnits: 'pixels',
                })
              })
            }
          else if (size === 1 && !feature.get('features')[0].get('isClick'))
            {
              style = new Style({
                zIndex: 1,
                image: new Icon({
                  src: 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent( SVGCreator.mapPin ),
                  // the svg height is 54px. It's the reason why the anchor is set like that
                  anchor: [0.5, 54],
                  anchorXUnits: 'fraction',
                  anchorYUnits: 'pixels',
                })
              })
            }
          else {
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
                font: "14px sans-serif",
                fill: new Fill({
                  color: '#fff',
                }),
              }),
            });
          }
          return style;
        },)
        this.map.addLayer(vectorLayer);
        if (mode.type === 'select') {
          this.map.on('click', function (evt) {
            map.forEachFeatureAtPixel(evt.pixel, function (feature) {
              if (feature && feature.getGeometry()?.getType() === 'Point') {
                if (feature.getProperties().features.length === 1) {
                  GeocityEvent.sendEvent('icon-clicked', feature.getProperties().features[0]);                
                }
              }
            });
          });
          window.addEventListener('valid-clicked', ((event: CustomEvent) => {
            const currentState = event.detail.get('isClick')
            if (currentState) {
              event.detail.set('isClick', false)
              this.map.getControls().forEach((control) => {
                if (control instanceof SelectInformationBoxController) {
                    this.map.removeControl(control);
                }
              });
            } else {
              vectorLayer.getSource()?.getFeatures().forEach((f) => f.get('features').forEach((f2:Feature) => {
                f2.set('isClick', false);
                this.map.getControls().forEach((control) => {
                  if (control instanceof SelectInformationBoxController) {
                      this.map.removeControl(control);
                  }
                });
              }))
              event.detail.set('isClick', true)
              map.addControl(new SelectInformationBoxController(event.detail.get('geometry').getCoordinates()))
            }
          }) as EventListener)
        }
      });

    window.addEventListener('current-center-position', ((event: CustomEvent) => {
      const nearestPoint = vectorSource.getClosestFeatureToCoordinate(event.detail);
      const circle = new Circle(event.detail, mode.radius);
      if (nearestPoint.getGeometry()?.getType() === 'Point') {
        const nearestPointCoordinate = (nearestPoint?.getGeometry() as Point).getCoordinates();
        // This event will use by the notification manager to inform about an nearest POI.
        if (circle.intersectsCoordinate(nearestPointCoordinate)) GeocityEvent.sendEvent('nearest-poi-position', nearestPointCoordinate);
      }
    }) as EventListener)
  }
}
