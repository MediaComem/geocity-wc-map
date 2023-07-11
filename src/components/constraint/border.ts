import {  Vector } from 'ol/source';
import { Vector as VectorLayer } from 'ol/layer';
import { Store } from '../../composable/store';
import GeoJSON from 'ol/format/GeoJSON';
import { Style, Fill, Stroke } from 'ol/style';
import { GeocityEvent } from '../../utils/geocity-event';
import { View } from 'ol';

export default class Border {
  constructor(store: Store) {
    const restrictionStyle = new Style({
      fill: new Fill({
        color: '#ffffff00',
      }),
      stroke: new Stroke({
        color: '#dddddd',
        width: 5,
      }),
    });

    const options = store.getOptions();
    if (!options) {
      throw new Error("Missing options");
    }
    const vectorMaskLayer = new VectorLayer({
      source: new Vector({
        url: () => {
          return options.border.url;
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
        const options = store.getOptions();
        if (!options) {
          throw new Error("Missing options");
        }
        const states = useStore().getStates();
        // view recreation based on https://stackoverflow.com/questions/40107137/how-to-set-extent-property-in-view-after-map-initialize-using-openlayer3
        // with fit, the border constraint doesn't work but with set view yes
        store.getMap()?.setView(new View({
          extent: extent,
          projection: 'EPSG:2056',
          center: states.readonly && states.currentSelections && states.currentSelections.length == 1 ? states.currentSelections[0] : options.defaultCenter,
          zoom: states.readonly && states.currentSelections && states.currentSelections.length == 1 ? options.maxZoom : options.zoom,
          minZoom: options.minZoom,
          maxZoom: options.maxZoom,
          enableRotation: options.interaction.enableRotation,
          constrainOnlyCenter: true,
        }));
      }
      store.setBorderConstraint(vectorMaskLayer)
      GeocityEvent.sendEvent('border-contraint-enabled', undefined);
    })

    store.getMap()?.addLayer(vectorMaskLayer);
  }
}
