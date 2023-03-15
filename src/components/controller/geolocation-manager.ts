import GeolocationMarker from '../mapView/geolocation-marker';
import LoaderBoxControl from '../notification/loader';
import { useStore } from '../../composable/store';
import { Overlay } from 'ol';
import {getTopLeft} from 'ol/extent';

export default class GeolocationManager {
  marker: GeolocationMarker | undefined;
  loaderBox: LoaderBoxControl;
  overlay: Overlay;

  removeLoaderBox() {
    this.loaderBox.hide();
  }

  chromeBasePermissionAnalyzer() {
    const geolocation = useStore().getGeolocation()
    
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
    useStore().getMap().removeOverlay(this.overlay);
    this.marker = new GeolocationMarker();
  }

  denied() {
    this.removeLoaderBox();
    useStore().getMap().removeOverlay(this.overlay);
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
    useStore().getMap().addOverlay(this.overlay);
    this.loaderBox.show();
    // This test is used to detect mobile device location enabled or disabled
    this.getLocation();
  }

  checkGeolocation() {
    const geolocation = useStore().getGeolocation()
    if (navigator.userAgent.match(/Chrome\/\d+/) !== null) {
      this.chromeBasePermissionAnalyzer();
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

  constructor() {
    const geolocation = useStore().getGeolocation()
    geolocation?.setTracking(true);
    const div = document.createElement('div');
    div.classList.add('map-overlay');
    const extent = useStore().getMap().getView().calculateExtent(useStore().getMap().getSize())
    this.overlay = new Overlay({ element: div, position: getTopLeft(extent)});
    this.loaderBox = new LoaderBoxControl('Chargement des données GPS');
    useStore().getMap().addControl(this.loaderBox);
    this.checkGeolocation();
  }
}
