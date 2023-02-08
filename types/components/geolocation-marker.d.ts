import Geolocation from 'ol/Geolocation';
import VectorLayer from 'ol/layer/Vector';
import Vector from 'ol/source/Vector';
export default class GeolocationMarker {
    geolocation: Geolocation | undefined;
    vectorLayer: VectorLayer<Vector<import("ol/geom/Geometry").default>>;
    vectorSource: Vector<import("ol/geom/Geometry").default>;
    constructor(geolocation: Geolocation | undefined);
}
