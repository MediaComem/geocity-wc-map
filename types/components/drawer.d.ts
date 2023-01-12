import Map from 'ol/Map.js';
import { Draw, Snap, Modify } from 'ol/interaction';
import { Vector as VectorSource } from 'ol/source';
export default class Drawer {
    map: Map;
    typeSelect: HTMLInputElement | null;
    draw: Draw | undefined;
    snap: Snap | undefined;
    source: VectorSource | undefined;
    modify: Modify | undefined;
    constructor(map: Map, renderRoot: HTMLElement | ShadowRoot);
    addInteraction(): void;
}
