import { Map } from 'ol';
interface ClusterOptions {
    distance: number;
    minDistance: number;
}
export default class WFSLoader {
    map: Map;
    constructor(map: Map, url: string, projectionSource: string, projectionDefinition: string, clusterOptions: ClusterOptions, intersectionRadius: number);
}
export {};
