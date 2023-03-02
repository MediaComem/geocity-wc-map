import { Draw, Snap, Modify } from 'ol/interaction';
import { Vector as VectorSource } from 'ol/source';
import { Vector as VectorLayer } from 'ol/layer';
export default class Drawer {
    draw: Draw | undefined;
    snap: Snap | undefined;
    source: VectorSource | undefined;
    modify: Modify | undefined;
    vector: VectorLayer<VectorSource>;
    nbDraw: number;
    constructor();
    removeInteraction(): void;
    couldContinueToDraw(): void;
    addInteraction(): void;
}
