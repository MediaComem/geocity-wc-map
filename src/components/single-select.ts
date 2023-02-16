import { Feature } from 'ol';
import Map from 'ol/Map';
import { Cluster, Vector } from 'ol/source';
import { Vector as VectorLayer } from 'ol/layer';
import { Geometry } from 'ol/geom';
import VectorSource from "ol/source/Vector.js";

import { GeocityEvent } from '../utils/geocity-event';
import SelectCreateInformationBoxController from './select-create-information-box';

import { useStore } from '../composable/store';
import SingleSelectStyle from './styles/single-select-style';
import IOption from '../utils/options';
import CustomStyleSelection from '../utils/custom-style-selection';
import WFSLoader from '../utils/wfs-loader';

export default class SingleSelect {

  control: SelectCreateInformationBoxController = new SelectCreateInformationBoxController();

  constructor() {
    const map = useStore().getMap();
    const options = useStore().getOptions();
    const vectorLayer = new VectorLayer();
    const vectorSource = WFSLoader.getSource(useStore().getOptions().wfs.url, '')
  
    this.displayDataOnMap(map, vectorLayer, options, vectorSource);

    map.on('click', function (evt) {
      map.forEachFeatureAtPixel(evt.pixel, function (feature) {
        if (feature && feature.getGeometry()?.getType() === 'Point') {
          if (feature.getProperties().features.length === 1) {
            useStore().setSelectedFeature(feature.getProperties().features[0]);
            GeocityEvent.sendEvent('icon-clicked', undefined);                
          }
        }
      });
    });

    window.addEventListener('recenter-selected-element', () => {
      useStore().getMap().getView().setCenter(useStore().getSelectedFeature()?.get('geom').getCoordinates())
    })    
  }

  displayDataOnMap(map: Map, vectorLayer: VectorLayer<Vector<Geometry>>, options: IOption, vectorSource: VectorSource) {
    const clusterSource = new Cluster({
      distance: options.cluster.distance,
      minDistance: options.cluster.minDistance,
      source: vectorSource,
    });
    
    vectorLayer.setSource(clusterSource)
    vectorLayer.setStyle(function (feature) {          
      return SingleSelectStyle.clusterWithIcon(feature);
    },)

    map.addLayer(vectorLayer);

    this.control.disable();
    map.addControl(this.control);
    this.toogleDataSelection(vectorLayer);
  }

  /*
    Check the selection state to check or uncheck the selected event.
    In addition, unselect all selected events if other icon is selected to keep only one selected element
  */
  toogleDataSelection(vectorLayer: VectorLayer<Vector<Geometry>>) {
    window.addEventListener('authorize-clicked', () => {
      const feature = useStore().getSelectedFeature();
      if (feature) {
        const currentState = feature.get('isClick')
        if (currentState) {
          feature.set('isClick', undefined)
          this.control.hide();
          // Set parameter for icon position display
          CustomStyleSelection.setCustomStyleWithouInfoBox();
        } else {
          // Search all selected icon to deselect them and ensure that only one element is selected.
          vectorLayer.getSource()?.getFeatures().forEach((feature) => {
            feature.get('features').forEach((geometryFeature:Feature) => {
              geometryFeature.set('isClick', undefined);
            });
          });
          feature.set('isClick', true);
          this.control.show()
          GeocityEvent.sendEvent('open-select-create-box', feature.get('geom').getCoordinates())
          useStore().setCustomDisplay(true);
          useStore().setTargetBoxSize('select');
        }
      }
      // Set right class to the map
      useStore().getMap().get('target').className = `${useStore().getTargetBoxSize()} ${useStore().getTheme()}`
    })
    
  }
}
