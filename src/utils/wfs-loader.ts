import WFS from 'ol/format/WFS.js';
import VectorSource from 'ol/source/Vector.js';
import { bbox as bboxStrategy, all as allStrategy } from 'ol/loadingstrategy.js';

export default class WFSLoader {
  static getSource(url: string, filter: string, isBboxStrategy: boolean) {
    return new VectorSource({
      format: new WFS({
        version: '2.0.0',
      }),
      url: (extent) => {
        let baseUrl = url;
        if (filter === '') {
          baseUrl + '&bbox=' + extent.join(',') + ',EPSG:2056';
        } else {
          if (filter.includes('<BBOX>')) {
            const bboxFilter = `<BBOX><ValueReference>geometry</ValueReference><Envelope srsName="urn:ogc:def:crs:EPSG::2056"><lowerCorner>${extent[0]} ${extent[1]}</lowerCorner><upperCorner>${extent[2]} ${extent[3]}</upperCorner></Envelope></BBOX>`;
            baseUrl = `${baseUrl}&${filter}`.replace('<BBOX>', bboxFilter);
          } else {
            console.error('The replacement string <BBOX> cannot be found. You lose the BBOX optimization.')
            baseUrl = `${baseUrl}&${filter}`;
          }
        }
        return baseUrl;
      },
      strategy: isBboxStrategy ? bboxStrategy : allStrategy,
    });
  }
}
