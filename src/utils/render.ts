import { Feature, Map } from 'ol';
import VectorLayer from 'ol/layer/Vector';
import { Vector } from 'ol/source';
import { Geometry, Point } from 'ol/geom';
import CreateStyle from '../components/styles/create-style';
import { FeatureLike } from 'ol/Feature';
import { EventTypes } from 'ol/Observable';
import EventManager from './event-manager';
import IStates from './states';
import { Store } from '../composable/store';

export class Render {

  vectorIsLoaded: Boolean = false;
  store: Store;

  constructor(store: Store){
    this.store = store;
  }

  setIsLoaded(state: boolean) {
    this.vectorIsLoaded = state;
  }

  getDefaultZoomFactor() {
    let zoom = this.store.getMap()?.getView().getZoom() || 1;
    if (zoom > 1) zoom = zoom / 2;
    return zoom;
  }

  setChangeResolution(map: Map, vectorLayer: VectorLayer<Vector<Geometry>>) {
    const options = this.store.getOptions();
    const minZoomAllowed = options?.notifications.find((notification) => notification.rule.type === 'ZOOM_CONSTRAINT')?.rule.minZoom || options?.zoom;
    const zoom = map.getView().getZoom();
    const resolution = map.getView().getResolution();
    if (zoom && resolution && minZoomAllowed && zoom > minZoomAllowed) {
      vectorLayer.setStyle(function (feature: FeatureLike) {
        return CreateStyle.setupCircles(feature, zoom / resolution);
      });
    }
  }

  setupAndLoadLayer(vectorSource: Vector<Geometry>) {
    const vectorLayer = new VectorLayer({
      source: vectorSource,
      visible: true,
    });
    vectorLayer.setStyle((feature) => {
      return CreateStyle.setupCircles(feature, this.getDefaultZoomFactor());
    });
    const map = this.store.getMap();
    if(!map) {
      return;
    }
    map?.addLayer(vectorLayer);
    const options = this.store.getOptions();
    if (!options) {
      return;
    }
    EventManager.registerBorderConstaintMapEvent(
      'change:resolution' as EventTypes,
      () => this.setChangeResolution(map, vectorLayer),
      map,
      options
    );

  }

  generateFeaturePointFromCoordinate(coordinates: number[]) {
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

  displayCurrentElementCreateTargetMode(vectorSource: Vector<Geometry>, states: IStates) {
    vectorSource.getFeatures().forEach((feature) => vectorSource.removeFeature(feature));
    if (states.currentSelections.length > 0) {
      states.currentSelections.forEach((coordinate) => {
        const feature = this.generateFeaturePointFromCoordinate(coordinate);
        if (!states.readonly) {
          this.store.addSelectedFeature(feature, feature.get('id'), 'create');
        }
        vectorSource.addFeature(feature);
      })
    }
  }

  loadSelectMode(vectorSource: Vector<Geometry>, states: IStates) {
    const usedCoordinates: Array<number[]> = [];
    if (states.currentSelections && states.currentSelections.length > 0) {
      vectorSource.getFeatures().forEach((feature) => {
        if (feature.get('isClick'))
          feature.set('isClick', false)
      });
      states.currentSelections.forEach((coordinate) => {
        vectorSource.getFeatures().forEach((feature: Feature) => {
          const fCoordinate = feature.get('geom').getCoordinates();
          if (
            fCoordinate[0].toFixed(2) == coordinate[0] &&
            fCoordinate[1].toFixed(2) == coordinate[1]
          ) {
            usedCoordinates.push(coordinate)
            feature.set('isClick', true);
            if (!states.readonly)
              this.store.addSelectedFeature(feature, feature.get('objectid'), 'select');
          }
        });
      });
    }
    return usedCoordinates;
  }

  displayCurrentElementSelectMode(vectorSource: Vector<Geometry>, states: IStates) {
    if (!this.vectorIsLoaded){
      vectorSource.on('featuresloadend', () => {
        this.loadSelectMode(vectorSource, states);
        this.vectorIsLoaded = true;
      })
    } else {
      this.loadSelectMode(vectorSource, states);
    }
  }

  loadMixMode(vectorSourceSelect: Vector<Geometry>, vectorSourceCreate: Vector<Geometry>, states: IStates) {
    const usedCoordinates = this.loadSelectMode(vectorSourceSelect, states);

    const updateStates: IStates = {
      readonly: states.readonly,
      currentSelections: states.currentSelections.filter((coordiante) => !usedCoordinates.includes(coordiante))
    }

    this.displayCurrentElementCreateTargetMode(vectorSourceCreate, updateStates);
  }

  displayMixMode(vectorSourceSelect: Vector<Geometry>, vectorSourceCreate: Vector<Geometry>, states: IStates) {
    if (vectorSourceSelect && vectorSourceCreate) {
      if (!this.vectorIsLoaded){
        vectorSourceSelect.on('featuresloadend', () => {
          this.loadMixMode(vectorSourceSelect, vectorSourceCreate, states);
          this.vectorIsLoaded = true;
        })
      } else {
        this.loadMixMode(vectorSourceSelect, vectorSourceCreate, states);
      }
    }
  }
}
