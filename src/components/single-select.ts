import { Feature } from 'ol';
import Map from 'ol/Map';
import { Cluster, Vector } from 'ol/source';
import { Vector as VectorLayer } from 'ol/layer';
import { Geometry, Point } from 'ol/geom';
import { parse } from 'ol/xml';

import { GeocityEvent } from '../utils/geocity-event';
import SelectCreateInformationBoxController from './select-create-information-box';

import { useStore } from '../composable/store';
import SingleSelectStyle from './styles/single-select-style';
import IOption from '../utils/options';
import CustomStyleSelection from '../utils/custom-style-selection';

export default class SingleSelect {

  control: SelectCreateInformationBoxController = new SelectCreateInformationBoxController();

  constructor() {
    const map = useStore().getMap();
    const options = useStore().getOptions();
    const vectorLayer = new VectorLayer();

    fetch(options.wfs.url)
      .then((response) => {
        return response.text();
      })
      .then((json) => {
        this.displayDataOnMap(map, json, vectorLayer, options)
        // Setup selection
        if (options.mode.type === 'select') {
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

          this.toogleDataSelection(vectorLayer);
        }

        window.addEventListener('recenter-selected-element', () => {
          useStore().getMap().getView().setCenter(useStore().getSelectedFeature()?.get('geometry').getCoordinates())
        })        
      });
  }

  parseToGeometry(json:string) {
    const vectorSource = new Vector; 
    const xmlDoc = parse(json);
    const features = xmlDoc.getElementsByTagName(
      'wfs:FeatureCollection'
    )[0];
    const layers = features.getElementsByTagName('wfs:member');
    for (let i = 0; i < layers.length; i++) {
      const geom = layers[i].getElementsByTagName('ms:geom')[0];
      const point = geom.getElementsByTagName('gml:Point')[0];
      const pos = point.getElementsByTagName('gml:pos')[0];
      const coordinates = pos.innerHTML.split(" ");
      const geomPoint = new Point([Number(coordinates[0]), Number(coordinates[1])]);
      const marker = new Feature({
        geometry: geomPoint,
        name: layers[i].getElementsByTagName('ms:objectid')[0].innerHTML,
        myCustomeValue: layers[i],
        isClick: false,
      });
      vectorSource.addFeature(marker);
    }
    return vectorSource;
  }

  displayDataOnMap(map: Map, json: string ,vectorLayer: VectorLayer<Vector<Geometry>>, options: IOption) {
    const clusterSource = new Cluster({
      distance: options.cluster.distance,
      minDistance: options.cluster.minDistance,
      source: this.parseToGeometry(json),
    });
    
    vectorLayer.setSource(clusterSource)
    vectorLayer.setStyle(function (feature) {          
      return SingleSelectStyle.clusterWithIcon(feature);
    },)

    map.addLayer(vectorLayer);

    this.control.disable();
    map.addControl(this.control);
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
          feature.set('isClick', false)
          this.control.hide();
          // Set parameter for icon position display
          CustomStyleSelection.setCustomStyleWithouInfoBox();
        } else {
          // Search all selected icon to deselect them and ensure that only one element is selected.
          vectorLayer.getSource()?.getFeatures().forEach((feature) => feature.get('features').forEach((geometryFeature:Feature) => {
            geometryFeature.set('isClick', false);
          }));
          feature.set('isClick', true);
          this.control.show()
          GeocityEvent.sendEvent('open-select-create-box', feature.get('geometry').getCoordinates())
          useStore().setCustomDisplay(true);
          useStore().setTargetBoxSize('select');
        }
      }
      // Set right class to the map
      useStore().getMap().get('target').className = `${useStore().getTargetBoxSize()} ${useStore().getTheme()}`
    })
  }
}
