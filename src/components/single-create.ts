import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { Vector } from 'ol/source';
import { useStore } from '../composable/store';
import { Vector as VectorLayer } from 'ol/layer';
import CreateStyle from './styles/create-style';
import { GeocityEvent } from '../utils/geocity-event';
import SelectCreateInformationBoxController from './select-create-information-box';
import { Map } from 'ol';

export default class SingleCreate {
  currentFeature: Feature | undefined;
  control: SelectCreateInformationBoxController = new SelectCreateInformationBoxController();

  constructor(mapElement: HTMLDivElement) {
    const map = useStore().getMap();
    const vectorSource = new Vector();   

    this.setupMapForCreation(map, vectorSource);

    window.addEventListener('authorize-created', () => {
      this.setupCreateElement(vectorSource)
    })

    window.addEventListener('remove-created-icon', () => {
      this.setupDeleteElement(vectorSource)
    })

    window.addEventListener('recenter-selected-element', () => {
      map.getView().setCenter(useStore().getSelectedFeature()?.get('geometry').getCoordinates())
    }) 

    this.longClickEvent(mapElement, map);
  }

  setupMapForCreation(map: Map, vectorSource: Vector) {
    const options = useStore().getOptions();
    const minZoomAllowed = options.notifications.find((notification) => notification.rule.type === 'ZOOM_CONSTRAINT')?.rule.minZoom || options.zoom;
    
    const vectorLayer = new VectorLayer({
      source: vectorSource,
      visible: true,
      style: [CreateStyle.setupSingleClick(1), CreateStyle.setupSingleClickCenterCircle(1)],
    });

    map.addLayer(vectorLayer);

    map.getView().on('change:resolution', () => {
      const zoom = map.getView().getZoom();
      const resolution = map.getView().getResolution();
      if (zoom && resolution && zoom > minZoomAllowed ) vectorLayer.setStyle([CreateStyle.setupSingleClick(zoom / resolution), CreateStyle.setupSingleClickCenterCircle(zoom / resolution)])
    })
    this.control.div.classList.add('disabled')
    map.addControl(this.control);
  }

  setupCreateElement(vectorSource:Vector) {
    const feature = useStore().getSelectedFeature();
    if (feature) {
      if (this.currentFeature) {
        vectorSource.removeFeature(this.currentFeature)
        this.control.div.classList.remove('fade-in');
        this.control.div.classList.add('fade-out');
      }
      this.currentFeature = feature;
      vectorSource.addFeature(this.currentFeature);
      this.control.div.classList.remove('disabled');
      this.control.div.classList.remove('fade-out');
      this.control.div.classList.add('fade-in');
      GeocityEvent.sendEvent('open-select-create-box', feature.get('geometry').getCoordinates())
      useStore().setCustomDisplay(true);
      useStore().setTargetBoxSize('select');
    }
    useStore().getMap().get('target').className = `${useStore().getTargetBoxSize()} ${useStore().getTheme()}`
  }

  setupDeleteElement(vectorSource:Vector) {
    if (this.currentFeature) {
      vectorSource.removeFeature(this.currentFeature)
      this.control.div.classList.remove('fade-in');
      this.control.div.classList.add('fade-out');
      vectorSource.removeFeature(this.currentFeature);
      this.currentFeature = undefined;
      useStore().setCustomDisplay(false);
      useStore().setTargetBoxSize('no-box');
    }
    useStore().getMap().get('target').className = `${useStore().getTargetBoxSize()} ${useStore().getTheme()}`
  }

  longClickEvent(mapElement: HTMLDivElement, map: Map) {
    const longClickDuration = 800;
    let startTime: number, endTime: number;
    let longpress: boolean = false;

    // Desktop device
    // pointerdown and pointerup aren't supported by openlayers map
    mapElement.addEventListener('pointerdown', () => {
      startTime = new Date().getTime();
    });
    mapElement.addEventListener('pointerup', () => {
      endTime = new Date().getTime();
      longpress = endTime - startTime < longClickDuration ? false : true;
    });

    map.on('click',  (e) => {
      if (longpress) {
        const geomPoint = new Point(e.coordinate);
        const feature = new Feature({
          geometry: geomPoint,
        });
        useStore().setSelectedFeature(feature)
        GeocityEvent.sendEvent('icon-created', undefined);
      }
    });

    // Mobile device. 
    // Using the map div because openlayers object doesn't support the touch event. But the div yes.
    mapElement.addEventListener('touchstart', () => {
      startTime = new Date().getTime();
    });

    mapElement.addEventListener('touchend', (e) => {      
      endTime = new Date().getTime();
      if (endTime - startTime > longClickDuration) {
        // To have the coordinate, we use the pixel position and the map position to find the exact pixel in the window.
        // Then use map pixel converter
        const coordiante = map.getCoordinateFromPixel([e.changedTouches[0].pageX - mapElement.offsetLeft, e.changedTouches[0].pageY - mapElement.offsetTop]);
        const geomPoint = new Point(coordiante);
        const feature = new Feature({
          geometry: geomPoint,
        });
        useStore().setSelectedFeature(feature)
        GeocityEvent.sendEvent('icon-created', undefined);
      }
    });
  }
}
