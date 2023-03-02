import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { Vector } from 'ol/source';
import { useStore } from '../../composable/store';
import { Vector as VectorLayer } from 'ol/layer';
import CreateStyle from '../styles/create-style';
import { GeocityEvent } from '../../utils/geocity-event';
import SelectCreateInformationBoxController from '../notification/select-create-information-box';
import { Map } from 'ol';
import CustomStyleSelection from '../../utils/custom-style-selection';

export default class SingleCreate {
  control: SelectCreateInformationBoxController = new SelectCreateInformationBoxController();
  private store;

  constructor(mapElement: HTMLDivElement) {
    this.store = useStore(); 
    const map = this.store.getMap();
    const vectorSource = new Vector();
  

    this.setupMapForCreation(map, vectorSource);

    window.addEventListener('authorize-created', ((event: CustomEvent) => {
      this.createElement(vectorSource, event)
    }) as EventListener)

    window.addEventListener('remove-created-icon', () => {
      this.deleteElement(vectorSource)
    })

    window.addEventListener('recenter-selected-element', () => {
      const currentItemID = this.store.getCurrentItemId();
      const coords = this.store.getSelectedFeature(currentItemID)?.get('geom').getCoordinates();
      map.getView().setCenter(coords);
    })

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

  setupMapForCreation(map: Map, vectorSource: Vector) {
    const options = this.store.getOptions();
    const minZoomAllowed = options.notifications.find((notification) => notification.rule.type === 'ZOOM_CONSTRAINT')?.rule.minZoom || options.zoom;
    
    const vectorLayer = new VectorLayer({
      source: vectorSource,
      visible: true,

    });
    
    vectorLayer.setStyle(function (feature) {          
      return CreateStyle.setupCircles(feature, (1));
    });

    map.addLayer(vectorLayer);

    map.getView().on('change:resolution', () => {
      const zoom = map.getView().getZoom();
      const resolution = map.getView().getResolution();
      if (zoom && resolution && zoom > minZoomAllowed ) {
        vectorLayer.setStyle(function (feature) {          
          return CreateStyle.setupCircles(feature, (zoom / resolution));
        });
      }
    })
    this.control.disable();
    map.addControl(this.control);
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
    this.store.getMap().get('target').className = `${this.store.getTargetBoxSize()} ${this.store.getTheme()}`
  }

  deleteElement(vectorSource:Vector) {
    const feature = this.store.getSelectedFeature(this.store.getCurrentItemId())
    if (feature) {
      vectorSource.removeFeature(feature)
      this.control.hide()
      this.store.removeSelectedFeature(this.store.getCurrentItemId());
      GeocityEvent.sendEvent('rule-validation', undefined);
      CustomStyleSelection.setCustomStyleWithouInfoBox();
    }
    this.store.getMap().get('target').className = `${this.store.getTargetBoxSize()} ${this.store.getTheme()}`
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
        if (this.store.getMaxElement() === 1) {
          this.store.removeSelectedFeature(this.store.getCurrentItemId());
        } 
        if (this.store.getMaxElement() === -1 || this.store.getSelectedFeatures().length <= this.store.getMaxElement()) {
          this.store.addSelectedFeature(feature, feature.get('id'), 'create')
          GeocityEvent.sendEvent('icon-created', feature.get('id'));
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
