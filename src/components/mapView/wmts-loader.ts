import Tile from 'ol/layer/Tile';
import WMTS, { optionsFromCapabilities } from 'ol/source/WMTS';
import WMTSCapabilities from 'ol/format/WMTSCapabilities.js';
import { Store } from '../../composable/store';
import TileSource from 'ol/source/Tile';
import * as olRender from 'ol/render';
import { Fill, Style } from 'ol/style';
import RenderEvent from 'ol/render/Event';

export default interface wmtsLayerConfiguration {
  capability: string;
  layer: string;
  projection: string;
  name: string;
  thumbnail: string;
}

export default class WMTSLoader {
  constructor(store: Store) {
    const parser = new WMTSCapabilities();
    const options = store.getOptions();
    if(!options) {
      throw new Error("Missing options");
    }
    const layers: Tile<TileSource>[] = [];
    Promise.all(options.wmts.map((wmts) => {
      fetch(wmts.capability).then((response) => response.text()).then(function (text) {
        const wmtsLayer = new Tile({
          opacity: 1,
        });
        const result = parser.read(text);
        const wmtsOptions = optionsFromCapabilities(result, {
          layer: wmts.layer,
          matrixSet: wmts.projection,
        });
        if (wmtsOptions) {
          wmtsLayer.setSource(new WMTS(wmtsOptions))
          wmtsLayer.setVisible(wmts.layer == options.wmts[0].layer);
          layers.push(wmtsLayer);
          store.getMap()?.getLayers().insertAt(0, wmtsLayer);
          if (store.getBorderConstraint()) {
            wmtsLayer.setExtent(store.getBorderConstraint()?.getSource()?.getExtent());
          }
          wmtsLayer.on('postrender', function (e: RenderEvent) {
            const vectorContext = olRender.getVectorContext(e);
            const context: CanvasRenderingContext2D = e.context as CanvasRenderingContext2D
            if (context) {
              context.globalCompositeOperation = 'destination-in';
              store.getBorderConstraint()?.getSource()?.forEachFeature(function (feature) {
              const style = new Style({
                fill: new Fill({
                  color: 'white',
                }),
              });
              vectorContext.drawFeature(feature, style);
            });
            context.globalCompositeOperation = 'source-over';
            }
              
          });
        }
      })
    }))
    
    if (options.border.url !== '') {
      window.addEventListener('border-contraint-enabled', () => {
        layers.forEach((wmtsLayer) => wmtsLayer.setExtent(store.getBorderConstraint()?.getSource()?.getExtent()))
      })
    }

    window.addEventListener('layer-selected', ((event: CustomEvent) => {
      layers.forEach((layer) => layer.setVisible(false))
      layers.find((layer) => {
        const source: WMTS = layer.getSource() as WMTS;
        return source && source.getLayer() === event.detail.layer ? layer : undefined
        })?.setVisible(true);
    }) as EventListener)
  }
}
