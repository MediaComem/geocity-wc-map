import { Map } from 'ol';
import ModeConfig from '../types/mode';
interface ClusterOptions {
    distance: number;
    minDistance: number;
}
export default class WFSLoader {
    map: Map;
    constructor(map: Map, url: string, projectionSource: string, projectionDefinition: string, clusterOptions: ClusterOptions, mode: ModeConfig);
}
export {};
