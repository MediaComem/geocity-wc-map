import { Map } from 'ol';
import TileLayer from 'ol/layer/Tile';
import WMTS, { optionsFromCapabilities } from 'ol/source/WMTS';
import WMTSCapabilities from 'ol/format/WMTSCapabilities.js';

interface wmtsLayerConfiguration {
  capability: string;
  layer: string;
  projection: string;
}

export default class WMTSLoader {
  constructor(map: Map, options:wmtsLayerConfiguration) {
    const parser = new WMTSCapabilities();

    fetch(options.capability)
    .then(function (response) {
      return response.text();
    })
    .then(function (text) {
      const result = parser.read(text);
      const wmtsOptions = optionsFromCapabilities(result, {
        layer: options.layer,
        matrixSet: options.projection,
      });
      if (wmtsOptions) {
        const wmtsLayer = new TileLayer({
          opacity: 1,
          source: new WMTS(wmtsOptions)
        });
        map.addLayer(wmtsLayer);
      }
    })
  }
}
