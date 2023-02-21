import GeolocationMarker from '../components/geolocation-marker';
import LoaderBoxControl from '../components/notification/loader';
import { useStore } from '../composable/store';

export default class GeolocationManager {
  marker: GeolocationMarker | undefined;
  loaderBox: LoaderBoxControl;

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
        if (permissionStatus.state === 'prompt') this.loaderBox.show();
        if (permissionStatus.state === 'granted') this.granted();

        permissionStatus.onchange = () => {
          if (permissionStatus.state === 'denied') {
            geolocation?.setTracking(false);
            this.denied()
          }
          if (permissionStatus.state === 'prompt') {
            this.loaderBox.show();
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
    this.marker = new GeolocationMarker();
  }

  denied() {
    this.removeLoaderBox();
    this.marker?.removeMarker();
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
        if (permissionStatus.state === 'prompt') this.loaderBox.show();
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
    this.loaderBox = new LoaderBoxControl('Chargement des données GPS');
    useStore().getMap().addControl(this.loaderBox);
    this.loaderBox.disable();
    this.checkGeolocation();
  }
}
