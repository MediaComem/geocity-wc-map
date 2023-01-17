import Map from 'ol/Map.js';
import { Draw, Snap, Modify } from 'ol/interaction';
import { Vector as VectorSource } from 'ol/source';
import { Vector as VectorLayer } from 'ol/layer';
export default class Drawer {
    map: Map;
    drawElement: string;
    draw: Draw | undefined;
    snap: Snap | undefined;
    source: VectorSource | undefined;
    modify: Modify | undefined;
    onlyOneDraw: Boolean;
    vector: VectorLayer<VectorSource>;
    nbDraw: number;
    constructor(map: Map, drawElement: string, onlyOneDraw: Boolean);
    setupInteraction(): void;
    removeInteraction(): void;
    updateNbDraw(): void;
    addInteraction(): void;
}
