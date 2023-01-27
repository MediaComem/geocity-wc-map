import { Feature, Map } from 'ol';
import { Vector } from 'ol/source';
import { Vector as VectorLayer } from 'ol/layer';
import { Point } from 'ol/geom';

import { Stroke, Style } from 'ol/style';
import CircleStyle from 'ol/style/Circle';

export default class TargetElement {
  

  constructor(map: Map) {
    const vectorLayer = new VectorLayer();
    const vectorSource = new Vector();
    
    const coordinate = map.getView().getCenter();
    if (coordinate) {
        const marker = new Feature({
            geometry: new Point(coordinate),
        });
        marker.setStyle(
            new Style({
                image: new CircleStyle({
                    radius: 5,
                    fill: undefined,
                    stroke: new Stroke({ color: 'red', width: 1 }),
                }),
            })
        )
        vectorSource.addFeature(marker);
        vectorLayer.setSource(vectorSource)
        map.addLayer(vectorLayer);

        map.getView().on('change:center', (event) => {
            marker.setGeometry(new Point(event.target.getCenter()));
        });
    }
  }
}
