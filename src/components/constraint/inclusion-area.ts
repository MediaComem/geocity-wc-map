import { Vector as VectorLayer } from "ol/layer.js";
import { useStore } from "../../composable/store";
import { GeocityEvent } from "../../utils/geocity-event";
import WFSLoader from "../../utils/wfs-loader";
import InclusionAreaStyle from "../styles/inclusion-area-style";
import VectorSource from "ol/source/Vector.js";
export default class InclusionArea {
  vectorSource: VectorSource;

  constructor() {
    this.vectorSource = WFSLoader.getSource(useStore().getOptions().inclusionArea.url, useStore().getOptions().inclusionArea.filter, true)
    const vector = new VectorLayer({
      source: this.vectorSource,
      style: InclusionAreaStyle.setupStyle(),
    });
    useStore().getMap().addLayer(vector);

    if (useStore().getOptions().mode.type === 'target') {
      window.addEventListener('current-center-position', ((
        event: CustomEvent
      ) => {
        this.couldCreate(event.detail);
      }) as EventListener);
    }
  }

  couldCreate(coordiante: number[]) {
    const nearestPoint = this.vectorSource.getClosestFeatureToCoordinate(
      coordiante
    );
    if (nearestPoint.getGeometry()?.getType() === 'Polygon') {
      const polygon = nearestPoint.getGeometry();
      const isIncluded = polygon?.intersectsCoordinate(coordiante);
      GeocityEvent.sendEvent('inclusion-area-included', isIncluded);
      return isIncluded;
    }
    return false;
  }
}