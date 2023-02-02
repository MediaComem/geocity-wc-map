import { Map } from 'ol';
export default interface wmtsLayerConfiguration {
    capability: string;
    layer: string;
    projection: string;
}
export default class WMTSLoader {
    constructor(map: Map, options: wmtsLayerConfiguration);
}
