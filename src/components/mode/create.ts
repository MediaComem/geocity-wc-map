import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { Vector } from 'ol/source';
import { Store } from '../../composable/store';
import { GeocityEvent } from '../../utils/geocity-event';
import SelectCreateInformationBoxController from '../notification/select-create-information-box';
import { Map } from 'ol';
import CustomStyleSelection from '../../utils/custom-style-selection';
import { Render } from '../../utils/render';
import VectorSource from "ol/source/Vector.js";
import IStates from '../../utils/states';
import InclusionArea from '../constraint/inclusion-area';

export default class SingleCreate {
  control: SelectCreateInformationBoxController;
  private store;
  vectorSource: VectorSource;
  states: IStates;
  renderUtils: Render;
  inclusionArea: InclusionArea | undefined;
  map: Map;
  previousElement: Feature | undefined;

  constructor(mapElement: HTMLDivElement, inclusionArea: InclusionArea | undefined, renderUtils: Render, states: IStates, store: Store) {
    this.store = store;
    this.states = states;
    this.inclusionArea = inclusionArea;
    this.renderUtils = renderUtils
    const map = this.store.getMap();
    if (!map) {
      throw new Error("Missing map");
    }
    this.map = map;
    this.control = new SelectCreateInformationBoxController(this.store);
    this.vectorSource = new Vector();

    this.setupMapForCreation(map, this.vectorSource);

    if (!this.states.readonly) {
      window.addEventListener('authorize-created', ((event: CustomEvent) => {
        this.createElement(this.vectorSource, event)
      }) as EventListener)

      window.addEventListener('refused-created', () => {
        this.store.removeLastSelectedFeature();
        // In case of max value = 1, the problem is that the element is already removed so we need to keep it
        // and reinsert it after test validation
        if (this.store.getMaxElement() === 1 && this.previousElement)
          this.store.addSelectedFeature(this.previousElement, this.previousElement.get('id'), 'create');
        GeocityEvent.sendEvent('rule-validation', undefined);
      })

      window.addEventListener('remove-created-icon', () => {
        this.deleteElement(this.vectorSource)
      })

      window.addEventListener('recenter-selected-element', () => {
        const currentItemID = this.store.getCurrentItemId();
        const coords = this.store.getSelectedFeature(currentItemID)?.get('geom').getCoordinates();
        map.getView().setCenter(coords);
      })

      if (this.store.getOptions()?.mode.type === 'mix') {
        window.addEventListener('remove-created', ((event: CustomEvent) => {
          this.vectorSource.getFeatures().forEach((feature) => {
            if (feature.get('id') === event.detail) {
              this.remove(this.vectorSource, feature)
            }
          })
        }) as EventListener)
      }

      this.addLongClickEvent(mapElement, map);

      map.on('click', (evt) =>  {
        map.forEachFeatureAtPixel(evt.pixel, (feature) =>  {
          if (feature && feature.getGeometry()?.getType() === 'Point') {
            if (feature.get('id')) {
              this.store.unselectFeatures();
              this.store.setCurrentItemId(feature.get('id'));
              this.store.getSelectedFeature(feature.get('id'))?.set('isSelected', true);
              GeocityEvent.sendEvent('open-select-create-box', feature.get('geom').getCoordinates());
              this.control.show();
            }
          }
        });
      });
    }
  }

  renderCurrentSelection(states: IStates) {
    this.renderUtils.displayCurrentElementCreateTargetMode(this.vectorSource, states);
  }

  removeCurrentSelection() {
    this.vectorSource.getFeatures().forEach((feature) => this.vectorSource.removeFeature(feature));
  }

  setupMapForCreation(map: Map, vectorSource: Vector) {
    this.renderUtils.setupAndLoadLayer(vectorSource)
    if (!this.states.readonly) {
      this.control.disable();
      map.addControl(this.control);
    }
  }

  createElement( vectorSource:Vector, event: CustomEvent) {
    const features = this.store.getSelectedFeatures();
    if (features.length > this.store.getMaxElement()) {
      this.store.removeSelectedFeature(event.detail);
      return;
    }
    this.store.setCurrentItemId(event.detail);
    const feature = this.store.getSelectedFeature(this.store.getCurrentItemId());
    if (feature) {
      if (this.store.getMaxElement() === 1) {
        vectorSource.getFeatures().forEach((f) => vectorSource.removeFeature(f));
        this.control.hide();
      } else {
        vectorSource.getFeatures().forEach((feature) => {
          if (feature.get('id') !== this.store.getCurrentItemId()) feature.set('isSelected', undefined);
        });
      }
      vectorSource.addFeature(feature);
      this.control.show()
      GeocityEvent.sendEvent('open-select-create-box', feature.get('geom').getCoordinates())
      this.store.setCustomDisplay(true);
      this.store.setTargetBoxSize('select');
    }
    this.map.get('target').className = `${this.store.getTargetBoxSize()} ${Store.getTheme()}`
  }

  remove(vectorSource:Vector, feature:Feature) {
    vectorSource.removeFeature(feature)
    this.control.hide()
    this.store.removeSelectedFeature(feature.get('id'));
  }

  deleteElement(vectorSource:Vector) {
    const feature = this.store.getSelectedFeature(this.store.getCurrentItemId())
    if (feature) {
      this.remove(vectorSource, feature)
      GeocityEvent.sendEvent('rule-validation', undefined);
      CustomStyleSelection.setCustomStyleWithouInfoBox(this.store);
    }
    this.map.get('target').className = `${this.store.getTargetBoxSize()} ${Store.getTheme()}`
  }

  addLongClickEvent(mapElement: HTMLDivElement, map: Map) {
    const longClickDuration = 800;
    let timeout: string | number | NodeJS.Timeout | undefined = undefined;
    let startPosition = [0,0];

    // Desktop device
    mapElement.addEventListener('mousedown', (e) => {
      startPosition = [e.pageX, e.pageY]
      this.clearCreationTimeout(timeout);
      timeout = setTimeout(() => {
        this.requestElementCreation(e.pageX, e.pageY, map, mapElement);
      }, longClickDuration)
    });

    mapElement.addEventListener('mousemove', (e) => {
      if (this.moveAnalyzer(startPosition, e.pageX, e.pageY)) this.clearCreationTimeout(timeout);
    });

    mapElement.addEventListener('mouseup', () => {
      this.clearCreationTimeout(timeout);
    });

    // Mobile device.
    // Using the map div because openlayers object doesn't support the touch event. But the div yes.
    mapElement.addEventListener('touchstart', (e) => {
      startPosition = [e.changedTouches[0].pageX, e.changedTouches[0].pageY]
      this.clearCreationTimeout(timeout);
      timeout = setTimeout(() => {
        this.requestElementCreation(e.changedTouches[0].pageX, e.changedTouches[0].pageY, map, mapElement);
      }, longClickDuration)
    });

    mapElement.addEventListener('touchmove', (e) => {
      if (this.moveAnalyzer(startPosition, e.changedTouches[0].pageX, e.changedTouches[0].pageY)) this.clearCreationTimeout(timeout);
    });

    mapElement.addEventListener('touchend', () => {
      this.clearCreationTimeout(timeout);
    });
  }

  requestElementCreation(x: number, y: number, map: Map, mapElement: HTMLDivElement) {
    if (!this.states.readonly) {
        // To have the coordinate, we use the pixel position and the map position to find the exact pixel in the window.
        // Then use map pixel converter
        const mapPosition = mapElement.getBoundingClientRect()
        const coordiante = map.getCoordinateFromPixel([x - mapPosition.left - document.documentElement.scrollLeft, y - mapPosition.top - document.documentElement.scrollTop]);
        const geomPoint = new Point(coordiante);
        const feature = new Feature({
          geom: geomPoint,
          id: Number(`${Math.round(coordiante[0])}${Math.round(coordiante[1])}`),
          isSelected: true
        });
        feature.setGeometryName('geom');
        if (this.inclusionArea && !this.inclusionArea.couldCreate(geomPoint.getCoordinates())) {
          return
        }
        if (this.store.getMaxElement() === 1) {
          // This part is in mix mode to remove the current selection in the select vector source
          // To replace by a create element
          if (this.store.getOptions()?.mode.type === 'mix') {
            const features = this.store.getSelectedFeatures();
            if (features && features.length === 1) {
              const currentType = this.store.getCurrentFeatureType(features[0].get('objectid'));
              if (currentType === 'select') {
                const id = features[0].get('objectid');
                GeocityEvent.sendEvent('remove-clicked', id)
              }
            }
          }
          const currentFeature = this.store.getSelectedFeatures();
          if (currentFeature.length > 0) {
            this.store.removeSelectedFeature(currentFeature[0].get('id'));
            this.previousElement = currentFeature[0];
          }
        } 
        if (this.store.getMaxElement() === -1 || this.store.getSelectedFeatures().length <= this.store.getMaxElement()) {
          this.store.addSelectedFeature(feature, feature.get('id'), 'create')
          GeocityEvent.sendEvent('icon-created', feature.get('id'));
        }
      }
  }

  // The move is on pixel
  moveAnalyzer(startPosition: Array<number>, xPosition: number, yPosition: number) {
    const maxMovePx = 10;
    return Math.abs(xPosition - startPosition[0]) > maxMovePx || Math.abs( yPosition - startPosition[1]) > maxMovePx ;
  }

  clearCreationTimeout(timeout: string | number | NodeJS.Timeout | undefined) {
    clearTimeout(timeout);
    timeout = undefined;
  }
}
