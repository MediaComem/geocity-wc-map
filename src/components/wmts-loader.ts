import { Map } from 'ol';
import { AttributionLike } from 'ol/source/Source';
import TileLayer from 'ol/layer/Tile';
import { XYZ } from 'ol/source';
import WMTSGrid from 'ol/tilegrid/WMTS';
import { get } from 'ol/proj';
import { getWidth } from 'ol/extent';

import proj4 from 'proj4';

interface layersConfiguration {
  resolutions?: Array<number>;
  attribution: string;
  format: string;
  serverLayerName: string;
  attributionUrl?: string;
  label: string;
  timestamps: Array<string>;
}

export default class WMTSLoader {
  map: Map;
  extent: Array<number> = [-20037508.34, -20048966.1, 20037508.34, 20048966.1];

  constructor(map: Map) {
    this.map = map;

    proj4.defs(
      'EPSG:3857',
      '+proj=merc +a=6378137 +b=6378137 +lat_ts=0 +lon_0=0 +x_0=0 +y_0=0 +k=1 +units=m +nadgrids=@null +wktext +no_defs +type=crs'
    );
    proj4.defs(
      'SR-ORG:6864',
      '+proj=merc +lon_0=0 +k=1 +x_0=0 +y_0=0 +a=6378137 +b=6378137 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs'
    );
    proj4.defs(
      'EPSG:2056',
      '+proj=somerc +lat_0=46.95240555555556 +lon_0=7.439583333333333 +k_0=1 +x_0=2600000 +y_0=1200000 +ellps=bessel +towgs84=674.374,15.056,405.346,0,0,0,0 +units=m +no_defs'
    );

    const projection = get('EPSG:3857');
    if (projection) {
      projection.setExtent(this.extent);

      const projectionExtent = projection?.getExtent();
      const size = getWidth(projectionExtent) / 256;
      const resolutions = new Array(19);
      const matrixIds = new Array(19);
      for (let z = 0; z < 19; ++z) {
        resolutions[z] = size / Math.pow(2, z);
        matrixIds[z] = z;
      }
      const layerConfig: layersConfiguration = {
        attribution: 'swisstopo',
        format: 'jpeg',
        serverLayerName: 'ch.swisstopo.pixelkarte-farbe',
        attributionUrl:
          'https://www.swisstopo.admin.ch/internet/swisstopo/fr/home.html',
        label: 'SWISSIMAGE',
        timestamps: ['current'],
      };

      const wmtsSource = (layerConfig: layersConfiguration) => {
        var tileGrid = new WMTSGrid({
          origin: [this.extent[0], this.extent[3]],
          resolutions: resolutions,
          matrixIds: matrixIds,
        });
        var extension = layerConfig.format || 'png';
        var timestamp = layerConfig['timestamps'][0];

        const attribution: AttributionLike =
          '<a target="new" href="https://www.swisstopo.admin.ch/internet/swisstopo/en/home.html">swisstopo</a>';

        return new XYZ({
          attributions: attribution,
          url:
            '//wmts10.geo.admin.ch/1.0.0/ch.swisstopo.swissimage/default/' +
            timestamp +
            '/3857/{z}/{x}/{y}.' +
            extension,
          tileGrid: tileGrid,
          projection: this.map.getView().getProjection(),
        });
      };

      const wmtsLayer = new TileLayer({
        source: wmtsSource(layerConfig),
      });
      this.map.addLayer(wmtsLayer);
    }
  }
}
