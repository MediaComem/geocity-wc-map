import GeolocationMarker from '../components/mapView/geolocation-marker';
import LoaderBoxControl from '../components/notification/loader';
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
