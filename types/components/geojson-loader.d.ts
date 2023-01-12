import { Map } from 'ol';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Style } from 'ol/style';
export default class GeojsonLoader {
    map: Map;
    data: Object;
    vectorSource: VectorSource;
    vectorLayer: VectorLayer<VectorSource>;
    constructor(map: Map, url: string);
    styleFunction(): Style;
}
