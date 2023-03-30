import GeolocationMarker from '../mapView/geolocation-marker';
import LoaderBoxControl from '../notification/loader';
import { Store } from '../../composable/store';
import { Overlay, Map } from 'ol';
import {getTopLeft} from 'ol/extent';

export default class GeolocationManager {
  marker: GeolocationMarker | undefined;
  loaderBox: LoaderBoxControl;
  overlay: Overlay;
  map: Map;

  removeLoaderBox() {
    this.loaderBox.hide();
  }

  chromeBasePermissionAnalyzer() {
    const geolocation = Store.getGeolocation()

    navigator.permissions
      .query({ name: 'geolocation' })
      .then((permissionStatus) => {
        if (permissionStatus.state === 'denied') {
          geolocation?.setTracking(false);
          this.denied();
        }
        if (permissionStatus.state === 'prompt') this.openInfo();
        if (permissionStatus.state === 'granted') this.granted();

        permissionStatus.onchange = () => {
          if (permissionStatus.state === 'denied') {
            geolocation?.setTracking(false);
            this.denied()
          }
          if (permissionStatus.state === 'prompt') {
            this.openInfo()
            geolocation?.setTracking(true);
            this.marker?.removeMarker();
          }
          if (permissionStatus.state === 'granted') {
            geolocation?.setTracking(true);
            this.granted();
          }
        };
      });
  }

  granted() {
    this.removeLoaderBox();
    this.map.removeOverlay(this.overlay);
    this.marker = new GeolocationMarker(this.map);
  }

  denied() {
    this.removeLoaderBox();
    this.map.removeOverlay(this.overlay);
    this.marker?.removeMarker();
  }

  geolocationSuccess() {
    this.granted()
  }

  geolocationError() {
    this.denied()
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.geolocationSuccess.bind(this),this.geolocationError.bind(this));
    } else {
      this.denied();
    }
  }

  openInfo() {
    this.map.addOverlay(this.overlay);
    this.loaderBox.show();
    // This test is used to detect mobile device location enabled or disabled
    this.getLocation();
  }

  checkGeolocation() {
    const geolocation = Store.getGeolocation()
    if (navigator.userAgent.match(/Chrome\/\d+/) !== null) {
      this.chromeBasePermissionAnalyzer();
    } else if (navigator.userAgent.match(/(iPod|iPhone|iPad)/) && navigator.userAgent.match(/AppleWebKit/)) {
      navigator.geolocation.getCurrentPosition(
        () => this.granted(),
        () => this.denied()
       );
    } else {
      navigator.permissions
      .query({ name: 'geolocation' })
      .then((permissionStatus) => {
        if (permissionStatus.state === 'denied') this.denied()
        if (permissionStatus.state === 'prompt') this.openInfo();
        if (permissionStatus.state === 'granted') this.granted();
      });

      geolocation?.on('error', () => {
        this.denied();
      })

      geolocation?.on('change:position', () => {
        this.granted();
      })
    }
  }

  constructor(map: Map) {
    if (!map) {
      throw new Error("Missing map!");
    }
    this.map = map;
    const geolocation = Store.getGeolocation()
    geolocation?.setTracking(true);
    const div = document.createElement('div');
    div.classList.add('map-overlay');
    const extent = this.map.getView().calculateExtent(this.map.getSize())
    this.overlay = new Overlay({ element: div, position: getTopLeft(extent), className: 'ol-overlay-container ol-selectable overlay-index'});
    this.loaderBox = new LoaderBoxControl('Chargement des données GPS');
    this.map.addControl(this.loaderBox);
    this.checkGeolocation();
  }
}
