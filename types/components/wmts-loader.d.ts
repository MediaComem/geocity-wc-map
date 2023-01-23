import { Map } from 'ol';
interface wmtsLayerConfiguration {
    capability: string;
    layer: string;
    projection: string;
}
export default class WMTSLoader {
    constructor(map: Map, options: wmtsLayerConfiguration);
}
export {};
