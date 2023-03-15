import { Vector as VectorLayer } from "ol/layer.js";
import { useStore } from "../../composable/store";
import { GeocityEvent } from "../../utils/geocity-event";
import WFSLoader from "../../utils/wfs-loader";
import InclusionAreaStyle from "../styles/inclusion-area-style";
export default class InclusionArea {
  constructor() {
    const vectorSource = WFSLoader.getSource(useStore().getOptions().inclusionArea.url, useStore().getOptions().inclusionArea.filter, true)
    const vector = new VectorLayer({
      source: vectorSource,
      style: InclusionAreaStyle.setupStyle(),
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