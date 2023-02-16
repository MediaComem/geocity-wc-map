import { Vector as VectorLayer } from "ol/layer.js";
import { Style, Stroke } from "ol/style";
import { useStore } from "../composable/store";
import { GeocityEvent } from "../utils/geocity-event";
import WFSLoader from "../utils/wfs-loader";
export default class InclusionArea {
  constructor() {
    
    const vectorSource = WFSLoader.getSource(useStore().getOptions().inclusionArea.url, useStore().getOptions().inclusionArea.filter)
    const vector = new VectorLayer({
      source: vectorSource,
      style: new Style({
        stroke: new Stroke({
          color: 'red',
          width: 1,
        }),
      }),
    });
    useStore().getMap().addLayer(vector);

    window.addEventListener('current-center-position', ((
      event: CustomEvent
    ) => {
      const nearestPoint = vectorSource.getClosestFeatureToCoordinate(
        event.detail
      );
      if (nearestPoint.getGeometry()?.getType() === 'Polygon') {
        const polygon = nearestPoint.getGeometry();
        GeocityEvent.sendEvent('inclusion-area-included', polygon?.intersectsCoordinate(event.detail));
      }
    }) as EventListener);
  }
}