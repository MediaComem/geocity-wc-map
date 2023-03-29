import VectorLayer from 'ol/layer/Vector';
import Vector from 'ol/source/Vector';
import { Map } from 'ol';
export default class GeolocationMarker {
    vectorLayer: VectorLayer<Vector<import("ol/geom/Geometry").default>>;
    vectorSource: Vector<import("ol/geom/Geometry").default>;
    map: Map;
    removeMarker(): void;
    constructor(map: Map);
}
