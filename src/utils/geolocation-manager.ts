import { Map, View, Geolocation } from 'ol';
import GeolocationMarker from '../components/geolocation-marker';
import LoaderBoxControl from '../components/notification/loader';

export default class GeolocationManager {
  geolocation: Geolocation;
  marker: GeolocationMarker | undefined;

  removeLoaderBox(map: Map) {
    map.getControls().forEach((control) => {
      if (control instanceof LoaderBoxControl) {
        map.removeControl(control);
      }
    });
  }

  constructor(map: Map, view: View) {
    this.geolocation = new Geolocation({
      trackingOptions: {
        enableHighAccuracy: true,
      },
      projection: view.getProjection(),
    });

    this.geolocation.setTracking(true);

    navigator.permissions
      .query({ name: 'geolocation' })
      .then((permissionStatus) => {
        if (permissionStatus.state === 'denied') this.geolocation.setTracking(false);
        if (permissionStatus.state === 'prompt') map.addControl(new LoaderBoxControl('Chargement des données GPS'));
        if (permissionStatus.state === 'granted') this.marker = new GeolocationMarker(map, this.geolocation);

        permissionStatus.onchange = () => {
          if (permissionStatus.state === 'denied') {
            this.geolocation.setTracking(false);
            this.removeLoaderBox(map);
            this.marker?.removeMarker();
          }
          if (permissionStatus.state === 'prompt') {
            map.addControl(new LoaderBoxControl('Chargement des données GPS'));
          }
          if (permissionStatus.state === 'granted') {
            this.geolocation.setTracking(true);
            this.removeLoaderBox(map);
            this.marker = new GeolocationMarker(map, this.geolocation);
          }
        };
      });
  }
}
