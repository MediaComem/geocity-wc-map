import { Feature } from 'ol';
import Map from 'ol/Map';
import { Cluster, Vector } from 'ol/source';
import { Vector as VectorLayer } from 'ol/layer';
import { Geometry } from 'ol/geom';
import VectorSource from "ol/source/Vector.js";

import { GeocityEvent } from '../../utils/geocity-event';
import SelectCreateInformationBoxController from '../notification/select-create-information-box';

import { useStore } from '../../composable/store';
import SingleSelectStyle from '../styles/single-select-style';
import IOption from '../../utils/options';
import CustomStyleSelection from '../../utils/custom-style-selection';
import WFSLoader from '../../utils/wfs-loader';
import EventManager from '../../utils/event-manager';
import { EventTypes } from 'ol/Observable';
import { Render } from '../../utils/render';
import IStates from '../../utils/states';

export default class SingleSelect {

  control: SelectCreateInformationBoxController = new SelectCreateInformationBoxController();
  private store;
  vectorSource: VectorSource;
  states: IStates;
  renderUtils: Render;

  constructor(renderUtils: Render, states: IStates) {
    this.store = useStore();
    this.states = states;
    this.renderUtils = renderUtils;
    const map = this.store.getMap();
    const options = this.store.getOptions();
    const vectorLayer = new VectorLayer();
    this.vectorSource = WFSLoader.getSource(useStore().getOptions().wfs.url, '', false)
    this.displayDataOnMap(map, vectorLayer, options, this.vectorSource);
    if (!this.states.readonly) {
      map.on('click', (evt) => {
        map.forEachFeatureAtPixel(evt.pixel, (feature) => {
          if (feature && feature.getGeometry()?.getType() === 'Point') {
            if (feature.getProperties().features && feature.getProperties().features.length === 1) {
              if (this.store.getSelectedFeature(feature.getProperties().features[0].get('objectid')) === undefined) {
                this.store.addSelectedFeature(feature.getProperties().features[0], feature.getProperties().features[0].get('objectid'), 'select');
              }
              GeocityEvent.sendEvent('icon-clicked', feature.getProperties().features[0].get('objectid'));                
            } else {
              this.control.hide();
            }
          }
        });
      });
    }

    window.addEventListener('recenter-selected-element', () => {
      const currentItemID = this.store.getCurrentItemId();
      const coords = this.store.getSelectedFeature(currentItemID)?.get('geom').getCoordinates();
      map.getView().setCenter(coords);
    })

    if (options.mode.type === 'mix') {
      window.addEventListener('remove-clicked', ((event: CustomEvent) => {
        vectorLayer.getSource()?.getFeatures().forEach((feature) => {
          feature.get('features').forEach((geometryFeature:Feature) => {
            if (geometryFeature.get('objectid') === event.detail) {
              this.removeItem(geometryFeature)
              this.control.hide();
            }
          });
        });
      }) as EventListener)
    }
  }

  renderCurrentSelection(states: IStates) {
    this.renderUtils.displayCurrentElementSelectMode(this.vectorSource, states);
  }

  setChangeResolution(map: Map, clusterSource: Cluster, options: IOption) {
    const zoom = map.getView().getZoom();
    if (zoom && zoom >= options.maxZoom)
      clusterSource.setDistance(0)
    else
      clusterSource.setDistance(options.cluster.distance) 
  }

  displayDataOnMap(map: Map, vectorLayer: VectorLayer<Vector<Geometry>>, options: IOption, vectorSource: VectorSource) {
    const clusterSource = new Cluster({
      distance: options.cluster.distance,
      minDistance: options.cluster.minDistance,
      source: vectorSource,
    });

    const style = new SingleSelectStyle();
    
    vectorLayer.setSource(clusterSource)
    vectorLayer.setStyle(function (feature) {          
      return style.clusterWithIcon(feature);
    },)

    map.addLayer(vectorLayer);

    this.control.disable();
    if (!this.states.readonly) {
      map.addControl(this.control);
      this.toogleDataSelection(vectorLayer);
    }
      

    EventManager.registerBorderConstaintMapEvent('change:resolution' as EventTypes, () => this.setChangeResolution(map, clusterSource, options))
  }

  setCurrentElement(feature: Feature) {
    this.store.getSelectedFeature(this.store.getCurrentItemId())?.set('isSelected', undefined)
    this.store.setCurrentItemId(feature.get('objectid'));
  }

  setIconToDisplay(feature: Feature, state: any) {
    feature.set('isClick', state);
    feature.set('isSelected', state)
  }

  removeSelectedItem(feature: Feature) {
    this.removeItem(feature)
    this.control.hide();
    GeocityEvent.sendEvent('rule-validation', undefined);
    // Set parameter for icon position display
    CustomStyleSelection.setCustomStyleWithouInfoBox();
  }

  removeItem(feature: Feature) {
    this.setIconToDisplay(feature, undefined);
    this.store.removeSelectedFeature(feature.get('objectid'));
  }

  setInformationBox(feature: Feature) {
    // Search all selected icon to deselect them and ensure that only one element is selected.
    this.setIconToDisplay(feature, true);
    this.control.show()
    GeocityEvent.sendEvent('open-select-create-box', feature.get('geom').getCoordinates())
    this.store.setCustomDisplay(true);
    this.store.setTargetBoxSize('select');
  }

  /*
    Check the selection state to check or uncheck the selected event.
    In addition, unselect all selected events if other icon is selected to keep only one selected element
  */
  toogleDataSelection(vectorLayer: VectorLayer<Vector<Geometry>>) {
    window.addEventListener('authorize-clicked', ((event: CustomEvent) => {
      const feature = this.store.getSelectedFeature(event.detail);
      if (feature) {
        const currentState = feature.get('isClick')
        if (currentState) {
          if (this.store.getMaxElement() === 1 || this.store.getCurrentItemId() === feature.get('objectid')) 
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
          if (this.store.getMaxElement() === 1) {
            // This part is in mix mode to remove the current selection in the create vector source
            // To replace by a select element
            if (this.store.getOptions().mode.type === 'mix') {
              const features = this.store.getSelectedFeatures();
              if (features && features.length >= 1) {
                const currentType = this.store.getCurrentFeatureType(features[0].get('id'));
                if (currentType === 'create') {
                  const id = features[0].get('id');
                  GeocityEvent.sendEvent('remove-created', id)
                }
              }
            }
            vectorLayer.getSource()?.getFeatures().forEach((feature) => {
              feature.get('features').forEach((geometryFeature:Feature) => {
                if (geometryFeature.get('isClick')) {
                  this.setIconToDisplay(geometryFeature, undefined);
                  this.store.removeSelectedFeature(geometryFeature.get('objectid'))
                }
              });
            });
            this.store.setCurrentItemId(feature.get('objectid'));
            GeocityEvent.sendEvent('rule-validation', undefined);
            this.setInformationBox(feature);
          } else {
            if (this.store.getMaxElement() === -1 || this.store.getSelectedFeatures().length <= this.store.getMaxElement()) {
              this.setCurrentElement(feature);
              this.setInformationBox(feature)
            }
            else {
              this.removeItem(feature);
            }
          }
        }
      }
      // Set right class to the map
      this.store.getMap().get('target').className = `${this.store.getTargetBoxSize()} ${this.store.getTheme()}`
    }) as EventListener)
  }
}
