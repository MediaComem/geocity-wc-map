import VectorLayer from 'ol/layer/Vector';
import Vector from 'ol/source/Vector';
export default class GeolocationMarker {
    vectorLayer: VectorLayer<Vector<import("ol/geom/Geometry").default>>;
    vectorSource: Vector<import("ol/geom/Geometry").default>;
    constructor();
}
