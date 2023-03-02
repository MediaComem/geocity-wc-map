import GeolocationMarker from '../mapView/geolocation-marker';
import LoaderBoxControl from '../notification/loader';
export default class GeolocationManager {
    marker: GeolocationMarker | undefined;
    loaderBox: LoaderBoxControl;
    removeLoaderBox(): void;
    chromeBasePermissionAnalyzer(): void;
    granted(): void;
    denied(): void;
    checkGeolocation(): void;
    constructor();
}
