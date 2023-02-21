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

    map.on('click', (evt) => {
      map.forEachFeatureAtPixel(evt.pixel, (feature) => {
        if (feature && feature.getGeometry()?.getType() === 'Point') {
          if (feature.getProperties().features && feature.getProperties().features.length === 1) {
            if (useStore().getSelectedFeature(feature.getProperties().features[0].get('objectid')) === undefined) {
              useStore().addSelectedFeature(feature.getProperties().features[0], feature.getProperties().features[0].get('objectid'), 'select');
            } 
            GeocityEvent.sendEvent('icon-clicked', feature.getProperties().features[0].get('objectid'));                
          } else {
            this.control.hide();
          }
        }
      });
    });

    window.addEventListener('recenter-selected-element', () => {
      useStore().getMap().getView().setCenter(useStore().getSelectedFeature(useStore().getCurrentItemId())?.get('geom').getCoordinates())
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

  setCurrentElement(feature: Feature) {
    useStore().getSelectedFeature(useStore().getCurrentItemId())?.set('isSelected', undefined)
    useStore().setCurrentItemId(feature.get('objectid'));
  }

  setIconToDisplay(feature: Feature, state: any) {
    feature.set('isClick', state);
    feature.set('isSelected', state)
  }

  removeSelectedItem(feature: Feature) {
    this.setIconToDisplay(feature, undefined);
    useStore().removeSelectedFeature(useStore().getCurrentItemId());
    console.log('aaaa')
    this.control.hide();
    GeocityEvent.sendEvent('rule-validation', undefined);
    // Set parameter for icon position display
    CustomStyleSelection.setCustomStyleWithouInfoBox();
  }

  /*
    Check the selection state to check or uncheck the selected event.
    In addition, unselect all selected events if other icon is selected to keep only one selected element
  */
  toogleDataSelection(vectorLayer: VectorLayer<Vector<Geometry>>) {
    window.addEventListener('authorize-clicked', ((event: CustomEvent) => {
      const feature = useStore().getSelectedFeature(event.detail);
      if (feature) {
        const currentState = feature.get('isClick')
        if (currentState) {
          if (useStore().getMaxElement() === 1 || useStore().getCurrentItemId() === feature.get('objectid')) 
            this.removeSelectedItem(feature)
          else {
            this.setCurrentElement(feature);
            feature.set('isSelected', true);
            GeocityEvent.sendEvent('open-select-create-box', feature.get('geom').getCoordinates())
            this.control.show();
          }
        }
        else {
          // Remove old selection to keep only the new one.
          // Special case when only 1 element could be selected.
          if (useStore().getMaxElement() === 1) {
            vectorLayer.getSource()?.getFeatures().forEach((feature) => {
              feature.get('features').forEach((geometryFeature:Feature) => {
                if (geometryFeature.get('isClick')) {
                  this.setIconToDisplay(geometryFeature, undefined);
                  useStore().removeSelectedFeature(geometryFeature.get('objectid'))
                }
              });
            });
            useStore().setCurrentItemId(feature.get('objectid'));
            GeocityEvent.sendEvent('rule-validation', undefined);
          } else {
            this.setCurrentElement(feature);
          }
          // Search all selected icon to deselect them and ensure that only one element is selected.
          this.setIconToDisplay(feature, true);
          this.control.show()
          GeocityEvent.sendEvent('open-select-create-box', feature.get('geom').getCoordinates())
          useStore().setCustomDisplay(true);
          useStore().setTargetBoxSize('select');
        }
      }
      // Set right class to the map
      useStore().getMap().get('target').className = `${useStore().getTargetBoxSize()} ${useStore().getTheme()}`
    }) as EventListener)
  }
}
