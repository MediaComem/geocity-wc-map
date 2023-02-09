import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Style } from 'ol/style';
export default class GeojsonLoader {
    data: Object;
    vectorSource: VectorSource;
    vectorLayer: VectorLayer<VectorSource>;
    constructor();
    styleFunction(): Style;
}
