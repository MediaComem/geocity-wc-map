import Feature from 'ol/Feature';
import Style from 'ol/style/Style';
import CircleStyle from 'ol/style/Circle';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import Point from 'ol/geom/Point';
import VectorLayer from 'ol/layer/Vector';
import Vector from 'ol/source/Vector';
import { useStore } from '../composable/store';

export default class GeolocationMarker {
    vectorLayer = new VectorLayer();
    vectorSource = new Vector;

    constructor() {
        const geolocation = useStore().getGeolocation();
        if (geolocation) {   
            const positionFeature = new Feature();
            positionFeature.setStyle(
            new Style({
                image: new CircleStyle({
                radius: 6,
                fill: new Fill({
                    color: '#3399CC',
                }),
                stroke: new Stroke({
                    color: '#fff',
                    width: 2,
                }),
                }),
            })
            );
    
            geolocation.on('change:position', function () {
                const coordinates = geolocation.getPosition();
                positionFeature.setGeometry(coordinates ? new Point(coordinates) : undefined);
            });
    
            this.vectorSource?.addFeature(positionFeature);
            this.vectorLayer.setSource(this.vectorSource)
            useStore().getMap().addLayer(this.vectorLayer);
        }
        
    }

}