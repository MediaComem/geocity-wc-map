import {  Vector } from 'ol/source';
import { Vector as VectorLayer } from 'ol/layer';
import { useStore } from '../composable/store';
import GeoJSON from 'ol/format/GeoJSON';
import { Style, Fill, Stroke } from 'ol/style';
import { GeocityEvent } from '../utils/geocity-event';
import { View } from 'ol';

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
      const extent = vectorMaskLayer.getSource()?.getExtent();
      if (extent) {
        const options = useStore().getOptions();
        // view recreation based on https://stackoverflow.com/questions/40107137/how-to-set-extent-property-in-view-after-map-initialize-using-openlayer3
        // with fit, the border constraint doesn't work but with set view yes
        useStore().getMap().setView(new View({
          extent: extent,   
          projection: 'EPSG:2056',
          center: options.defaultCenter,
          zoom: options.zoom,
          minZoom: options.minZoom,
          maxZoom: options.maxZoom,
          enableRotation: options.enableRotation,
          constrainOnlyCenter: true,
        }));
      }
      GeocityEvent.sendEvent('border-contraint-enabled', vectorMaskLayer.getSource()?.getExtent());
    })

    useStore().getMap().addLayer(vectorMaskLayer);
  }
}
