import {  Vector } from 'ol/source';
import { Vector as VectorLayer } from 'ol/layer';
import { useStore } from '../composable/store';
import GeoJSON from 'ol/format/GeoJSON';
import { Style, Fill, Stroke } from 'ol/style';
import { GeocityEvent } from '../utils/geocity-event';

export default class Border {
  constructor() {
    const restrictionStyle = new Style({
      fill: new Fill({
        color: '#ffffff00',
      }),
      stroke: new Stroke({
        color: '#dddddd',
        width: 5,
      }),
    });

    const vectorMaskLayer = new VectorLayer({
      source: new Vector({
        url: () => {
          return useStore().getOptions().borderUrl;
        },
        format: new GeoJSON(),
      }),
      zIndex: 9999,
      style: restrictionStyle,
      opacity: 0.9,
    });

    vectorMaskLayer.on("change", () => {
      GeocityEvent.sendEvent('border-contraint-enabled', vectorMaskLayer.getSource()?.getExtent());
    })

    useStore().getMap().getView().on('change:center', (event:any) => {
      const geometry = vectorMaskLayer?.getSource()?.getFeatures();
      if (geometry && !geometry[0]?.getGeometry()?.intersectsCoordinate(event.target.getCenter())) {
        useStore().getMap().getView().setCenter(vectorMaskLayer?.getSource()?.getFeatures()[0].getGeometry()?.getClosestPoint(event.target.getCenter()))
      }
    });

    useStore().getMap().addLayer(vectorMaskLayer);
  }
}
