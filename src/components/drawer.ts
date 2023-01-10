import Map from 'ol/Map.js';
import { Draw, Snap, Modify } from 'ol/interaction';
import { Vector as VectorSource } from 'ol/source';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';
import { Vector as VectorLayer } from 'ol/layer';
import { Type } from 'ol/geom/Geometry';

export default class Drawer {
  map: Map;
  typeSelect: HTMLInputElement | null;
  draw: Draw | undefined;
  snap: Snap | undefined;
  source: VectorSource | undefined;
  modify: Modify | undefined;

  constructor(map: Map, renderRoot: HTMLElement | ShadowRoot) {
    this.map = map;
    this.source = new VectorSource();
    const vector = new VectorLayer({
      source: this.source,
      style: new Style({
        fill: new Fill({
          color: 'rgba(255, 255, 255, 0.2)',
        }),
        stroke: new Stroke({
          color: '#ffcc33',
          width: 2,
        }),
        image: new CircleStyle({
          radius: 7,
          fill: new Fill({
            color: '#ffcc33',
          }),
        }),
      }),
    });
    this.map.addLayer(vector);
    this.modify = new Modify({ source: this.source });
    this.map.addInteraction(this.modify);
    this.typeSelect = renderRoot.querySelector('#drawer') as HTMLInputElement;
    this.addInteraction();
    if (this.typeSelect) {
      this.typeSelect.addEventListener('change', () => {
        if (this.draw) this.map.removeInteraction(this.draw);
        if (this.snap) this.map.removeInteraction(this.snap);
        this.addInteraction();
      });
    }
  }

  addInteraction() {
    if (this.typeSelect) {
      this.draw = new Draw({
        source: this.source,
        type: this.typeSelect.value as Type,
      });
      this.map.addInteraction(this.draw);
      this.snap = new Snap({ source: this.source });
      this.map.addInteraction(this.snap);
    }
  }
}
