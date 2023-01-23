import Map from 'ol/Map.js';
import { Draw, Snap, Modify } from 'ol/interaction';
import { Vector as VectorSource } from 'ol/source';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';
import { Vector as VectorLayer } from 'ol/layer';
import { Type } from 'ol/geom/Geometry';

export default class Drawer {
  map: Map;
  drawElement: string;
  draw: Draw | undefined;
  snap: Snap | undefined;
  source: VectorSource | undefined;
  modify: Modify | undefined;
  vector: VectorLayer<VectorSource>;
  nbDraw: number = 0;
  maxNbDrwa: number = -1;

  constructor(map: Map, drawElement: string, maxNbDraw: number) {
    this.map = map;
    this.drawElement = drawElement;
    this.maxNbDrwa = maxNbDraw;
    this.source = new VectorSource();
    this.vector = new VectorLayer({
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
    this.map.addLayer(this.vector);
    this.modify = new Modify({ source: this.source });
    this.map.addInteraction(this.modify);
    this.addInteraction();
  }

  removeInteraction() {
    if (this.draw) this.map.removeInteraction(this.draw);
    if (this.snap) this.map.removeInteraction(this.snap);
  }

  couldContinueToDraw() {
    if (this.maxNbDrwa != -1) {
      this.nbDraw += 1;
      if (this.nbDraw >= this.maxNbDrwa && this.draw) this.draw.addEventListener('drawend', this.removeInteraction.bind(this));      
    }
  }

  addInteraction() {
    this.draw = new Draw({
      source: this.source,
      type: this.drawElement as Type,
    });
    this.map.addInteraction(this.draw);
    this.snap = new Snap({ source: this.source });
    this.map.addInteraction(this.snap);
    this.draw.addEventListener('drawstart', this.couldContinueToDraw.bind(this));   
  }
}
