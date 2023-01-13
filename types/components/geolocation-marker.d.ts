import Map from 'ol/Map.js';
import Geolocation from 'ol/Geolocation';
import VectorLayer from 'ol/layer/Vector';
import Vector from 'ol/source/Vector';
export default class GeolocaliseMarker {
    map: Map;
    geolocation: Geolocation;
    vectorLayer: VectorLayer<Vector<import("ol/geom/Geometry").default>>;
    vectorSource: Vector<import("ol/geom/Geometry").default>;
    constructor(map: Map, geolocation: Geolocation);
}
