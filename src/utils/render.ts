import { Feature, Map } from 'ol';
import VectorLayer from 'ol/layer/Vector';
import { Vector } from 'ol/source';
import { Geometry, Point } from 'ol/geom';
import CreateStyle from '../components/styles/create-style';
import { useStore } from '../composable/store';
import { FeatureLike } from 'ol/Feature';
import { EventTypes } from 'ol/Observable';
import EventManager from './event-manager';

export class Render {
  static getDefaultZoomFactor() {
    let zoom = useStore().getMap().getView().getZoom() || 1;
    if (zoom > 1) zoom = zoom / 2;
    return zoom;
  }

  static setChangeResolution(map: Map, vectorLayer: VectorLayer<Vector<Geometry>>) {
    const options = useStore().getOptions();
    const minZoomAllowed = options.notifications.find((notification) => notification.rule.type === 'ZOOM_CONSTRAINT')?.rule.minZoom || options.zoom;
    const zoom = map.getView().getZoom();
    const resolution = map.getView().getResolution();
    if (zoom && resolution && zoom > minZoomAllowed) {
      vectorLayer.setStyle(function (feature: FeatureLike) {
        return CreateStyle.setupCircles(feature, zoom / resolution);
      });
    }
  }

  static setupAndLoadLayer(vectorSource: Vector<Geometry>) {
    const vectorLayer = new VectorLayer({
      source: vectorSource,
      visible: true,
    });
    vectorLayer.setStyle((feature) => {          
      return CreateStyle.setupCircles(feature, Render.getDefaultZoomFactor());
    });
    useStore().getMap().addLayer(vectorLayer);
    EventManager.registerBorderConstaintMapEvent('change:resolution' as EventTypes, () => Render.setChangeResolution(useStore().getMap(), vectorLayer))
  
  }

  static generateFeaturePointFromCoordinate(coordinates: number[]) {
    const coordinate = coordinates;
    const geomPoint = new Point(coordinate);
    const feature = new Feature({
      geom: geomPoint,
      id: Number(`${Math.round(coordinate[0])}${Math.round(coordinate[1])}`),
      isSelected: false,
    });
    feature.setGeometryName('geom');
    return feature;
  }

  static displayCurrentElementCreateTargetMode(vectorSource: Vector<Geometry>) {
    const currentSelections = useStore().getStates().currentSelections;
    if (currentSelections.length > 0) {
      currentSelections.forEach((coordinate) => {
        const feature = Render.generateFeaturePointFromCoordinate(coordinate);
        vectorSource.addFeature(feature);
        useStore().addSelectedFeature(feature, feature.get('id'), 'create');
      })
    }
  }

  static displayCurrentElementSelectMode(vectorSource: Vector<Geometry>) {
    vectorSource.on('featuresloadend', () => {
      const currentSelections = useStore().getStates().currentSelections;
      if (currentSelections && currentSelections.length > 0) {
        currentSelections.forEach((coordinate) => {
          vectorSource.getFeatures().forEach((feature: Feature) => {
            const fCoordinate = feature.get('geom').getCoordinates();
            if (
              fCoordinate[0].toFixed(2) == coordinate[0] &&
              fCoordinate[1].toFixed(2) == coordinate[1]
            ) {
              feature.set('isClick', true);
              useStore().addSelectedFeature(feature, feature.get('objectid'), 'select');
            }
          });
        });
      }
    });
  }
}
