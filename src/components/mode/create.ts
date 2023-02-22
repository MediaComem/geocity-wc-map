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

  constructor(mapElement: HTMLDivElement) {
    const map = useStore().getMap();
    const vectorSource = new Vector();   

    this.setupMapForCreation(map, vectorSource);

    window.addEventListener('authorize-created', () => {
      this.createElement(vectorSource)
    })

    window.addEventListener('remove-created-icon', () => {
      this.deleteElement(vectorSource)
    })

    window.addEventListener('recenter-selected-element', () => {
      map.getView().setCenter(useStore().getSelectedFeature(useStore().getCurrentItemId())?.get('geom').getCoordinates())
    })

    this.addLongClickEvent(mapElement, map);

    map.on('click', (evt) =>  {
      map.forEachFeatureAtPixel(evt.pixel, (feature) =>  {
        if (feature && feature.getGeometry()?.getType() === 'Point') {
          if (feature.get('id')) {
            useStore().unselectFeatures();
            useStore().setCurrentItemId(feature.get('id'));
            useStore().getSelectedFeature(feature.get('id'))?.set('isSelected', true);
            GeocityEvent.sendEvent('open-select-create-box', feature.get('geom').getCoordinates());
            this.control.show();
          } else {
            this.control.hide();
          }
        }
      });
    });
  }

  setupMapForCreation(map: Map, vectorSource: Vector) {
    const options = useStore().getOptions();
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

  createElement( vectorSource:Vector) {
    const feature = useStore().getSelectedFeature(useStore().getCurrentItemId());
    if (feature) {
      if (useStore().getMaxElement() === 1) {
        vectorSource.getFeatures().forEach((f) => vectorSource.removeFeature(f));
        this.control.hide();
      } else {
        vectorSource.getFeatures().forEach((feature) => {
          if (feature.get('id') !== useStore().getCurrentItemId()) feature.set('isSelected', undefined);
        });
      }
      vectorSource.addFeature(feature);
      this.control.show()
      GeocityEvent.sendEvent('open-select-create-box', feature.get('geom').getCoordinates())
      useStore().setCustomDisplay(true);
      useStore().setTargetBoxSize('select');
    }
    useStore().getMap().get('target').className = `${useStore().getTargetBoxSize()} ${useStore().getTheme()}`
  }

  deleteElement(vectorSource:Vector) {
    const feature = useStore().getSelectedFeature(useStore().getCurrentItemId())
    if (feature) {
      vectorSource.removeFeature(feature)
      this.control.hide()
      useStore().removeSelectedFeature(useStore().getCurrentItemId());
      GeocityEvent.sendEvent('rule-validation', undefined);
      CustomStyleSelection.setCustomStyleWithouInfoBox();
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
          geom: geomPoint,
          id: Number(`${Math.round(coordiante[0])}${Math.round(coordiante[1])}`),
          isSelected: true
        });
        feature.setGeometryName('geom');
        if (useStore().getMaxElement() === 1) {
          useStore().removeSelectedFeature(useStore().getCurrentItemId());
        }
        useStore().setCurrentItemId(feature.get('id'))
        useStore().addSelectedFeature(feature, feature.get('id'), 'create')
        GeocityEvent.sendEvent('icon-created', undefined);
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
