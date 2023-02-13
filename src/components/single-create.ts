import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { Vector } from 'ol/source';
import { useStore } from '../composable/store';
import { Vector as VectorLayer } from 'ol/layer';
import CreateStyle from './styles/create-style';
import { GeocityEvent } from '../utils/geocity-event';
import SelectCreateInformationBoxController from './select-create-information-box';
import { Control } from 'ol/control';
import { Map } from 'ol';

export default class SingleCreate {
  currentFeature: Feature | undefined;

  constructor(mapElement: HTMLDivElement) {
    const map = useStore().getMap();
    const vectorSource = new Vector();   

    this.setupMapForCreation(map, vectorSource);

    window.addEventListener('authorize-created', () => {
      this.createElement(map, vectorSource)
    })

    window.addEventListener('remove-created-icon', () => {
      this.deleteElement(map, vectorSource)
    })

    window.addEventListener('recenter-selected-element', () => {
      map.getView().setCenter(useStore().getSelectedFeature()?.get('geometry').getCoordinates())
    }) 

    this.addLongClickEvent(mapElement, map);
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
  }

  createElement(map: Map, vectorSource:Vector) {
    const feature = useStore().getSelectedFeature();
    if (feature) {
      if (this.currentFeature) {
        vectorSource.removeFeature(this.currentFeature)
        map.getControls().forEach((control: Control) => {
          if (control instanceof SelectCreateInformationBoxController) {
            map.removeControl(control);
          }
        });
      }
      this.currentFeature = feature;
      vectorSource.addFeature(this.currentFeature);
      map.addControl(new SelectCreateInformationBoxController(feature.get('geometry').getCoordinates()));
      useStore().setCustomDisplay(true);
      useStore().setTargetBoxSize('select');
    }
    useStore().getMap().get('target').className = `${useStore().getTargetBoxSize()} ${useStore().getTheme()}`
  }

  deleteElement(map: Map, vectorSource:Vector) {
    if (this.currentFeature) {
      vectorSource.removeFeature(this.currentFeature)
        map.getControls().forEach((control: Control) => {
          if (control instanceof SelectCreateInformationBoxController) {
            map.removeControl(control);
          }
        });
      vectorSource.removeFeature(this.currentFeature);
      this.currentFeature = undefined;
      useStore().setCustomDisplay(false);
      useStore().setTargetBoxSize('no-box');
    }
    useStore().getMap().get('target').className = `${useStore().getTargetBoxSize()} ${useStore().getTheme()}`
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
        const coordiante = map.getCoordinateFromPixel([x - mapElement.offsetLeft, y - mapElement.offsetTop]);
        const geomPoint = new Point(coordiante);
        const feature = new Feature({
          geometry: geomPoint,
        });
        useStore().setSelectedFeature(feature)
        GeocityEvent.sendEvent('icon-created', undefined);
  }

  moveAnalyzer(startPosition: Array<number>, xPosition: number, yPosition: number) {
    return startPosition[0] - 10 > xPosition || startPosition[0] + 10 < xPosition || startPosition[1] - 10 > yPosition || startPosition[1] + 10 < yPosition;
  }

  clearCreationTimeout(timeout: string | number | NodeJS.Timeout | undefined) {
    clearTimeout(timeout);
    timeout = undefined;
  }
}
