
import { Draw, Snap, Modify } from 'ol/interaction';
import { Vector as VectorSource } from 'ol/source';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';
import { Vector as VectorLayer } from 'ol/layer';
import { Type } from 'ol/geom/Geometry';
import { useStore } from '../composable/store';

export default class Drawer {
  draw: Draw | undefined;
  snap: Snap | undefined;
  source: VectorSource | undefined;
  modify: Modify | undefined;
  vector: VectorLayer<VectorSource>;
  nbDraw: number = 0;

  constructor() {
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
    useStore().getMap().addLayer(this.vector);
    this.modify = new Modify({ source: this.source });
    useStore().getMap().addInteraction(this.modify);
    this.addInteraction();
  }

  removeInteraction() {
    if (this.draw) useStore().getMap().removeInteraction(this.draw);
    if (this.snap) useStore().getMap().removeInteraction(this.snap);
  }

  couldContinueToDraw() {
    if (useStore().getOptions().maxNbDraw != -1) {
      this.nbDraw += 1;
      if (this.nbDraw >= useStore().getOptions().maxNbDraw && this.draw) this.draw.addEventListener('drawend', this.removeInteraction.bind(this));      
    }
  }

  addInteraction() {
    this.draw = new Draw({
      source: this.source,
      type: useStore().getOptions().drawElement as Type,
    });
    useStore().getMap().addInteraction(this.draw);
    this.snap = new Snap({ source: this.source });
    useStore().getMap().addInteraction(this.snap);
    this.draw.addEventListener('drawstart', this.couldContinueToDraw.bind(this));   
  }
}
