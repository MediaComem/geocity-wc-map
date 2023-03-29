import GeolocationMarker from '../mapView/geolocation-marker';
import LoaderBoxControl from '../notification/loader';
import { Overlay, Map } from 'ol';
export default class GeolocationManager {
    marker: GeolocationMarker | undefined;
    loaderBox: LoaderBoxControl;
    overlay: Overlay;
    map: Map;
    removeLoaderBox(): void;
    chromeBasePermissionAnalyzer(): void;
    granted(): void;
    denied(): void;
    geolocationSuccess(): void;
    geolocationError(): void;
    getLocation(): void;
    openInfo(): void;
    checkGeolocation(): void;
    constructor(map: Map);
}
