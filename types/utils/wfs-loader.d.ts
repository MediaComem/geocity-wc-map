import VectorSource from 'ol/source/Vector.js';
export default class WFSLoader {
    static getSource(url: string, filter: string): VectorSource<import("ol/geom/Geometry").default>;
}
