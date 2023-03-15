import { Style, Stroke, Fill } from "ol/style";

export default class InclusionAreaStyle {
  static setupStyle() {
    return new Style({
      stroke: new Stroke({
        color: '#C026D3',
        width: 1,
      }),
      fill: new Fill({
        color: 'rgb(191, 38, 211, 0.10)',
      })
    });
  }
}
