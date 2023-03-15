import GeolocationMarker from '../mapView/geolocation-marker';
import LoaderBoxControl from '../notification/loader';
import { Overlay } from 'ol';
export default class GeolocationManager {
    marker: GeolocationMarker | undefined;
    loaderBox: LoaderBoxControl;
    overlay: Overlay;
    removeLoaderBox(): void;
    chromeBasePermissionAnalyzer(): void;
    granted(): void;
    denied(): void;
    geolocationSuccess(): void;
    geolocationError(): void;
    getLocation(): void;
    openInfo(): void;
    checkGeolocation(): void;
    constructor();
}
