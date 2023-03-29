import { Feature } from "ol";
import GeoJSON from "ol/format/GeoJSON";
import { MultiPoint, Geometry, GeometryCollection, Point } from "ol/geom";
import { Store } from "../composable/store";

export default class OutputFormat {
  geojsonFormat: GeoJSON = new GeoJSON();

  convertToMultiPoint(coordinate: number[]) {
    return new Feature({
      geometry: new MultiPoint([[coordinate[0], coordinate[1]]]),
    });
  }

  formatGeometryCollection(geometries: Geometry[]) {
    const geometry = new GeometryCollection(geometries);
    return this.geojsonFormat.writeGeometry(geometry, {
      decimals: 2,
    });
  }

  formatFeatureCollection(features: Feature[]) {
    return this.geojsonFormat.writeFeatures(features, {
      decimals: 2,
    });
  }

  generateGeometryCollection(features: Array<Feature>) {
    const geometries: Geometry[] = [];
    features.forEach((feature) => {
      const geometry = feature.getGeometry();
      if (geometry) {
        const point: Point = geometry as Point;
        const multiPoint = this.convertToMultiPoint(
          point.getCoordinates()
        ).getGeometry();
        if (multiPoint) {
          geometries.push(multiPoint);
        }
      }
    });
    return this.formatGeometryCollection(geometries);
  }

  generateFeatureCollection(features: Feature[], store: Store) {
    const outputFeatures: Feature[] = [];
    features.forEach((feature) => {
      const geometry = feature.getGeometry();
      if (geometry) {
        const point: Point = geometry as Point;
        const multiPoint = this.convertToMultiPoint(point.getCoordinates());
        if (multiPoint) {
          const id = feature.get('objectid');
          if (id && store.getCurrentFeatureType(id) === 'select')
            multiPoint.set('objectid', id);
          outputFeatures.push(multiPoint);
        }
      }
    });
    return this.formatFeatureCollection(outputFeatures);
  }

  generateTargetGeometry(coordinate: number[], store: Store) {
    const multiPoint = this.convertToMultiPoint(coordinate);
    if (multiPoint) {
      if (store.getOptions()?.outputFormat === 'GeometryCollection') {
        const geometry = multiPoint.getGeometry();
        if (geometry) return this.formatGeometryCollection([geometry]);
        return undefined;
      }
      return this.formatFeatureCollection([multiPoint]);
    }
    return undefined;
  }

  generateExportData(features: Array<Feature>, store: Store) {
    if (store.getOptions()?.outputFormat === 'GeometryCollection')
      return this.generateGeometryCollection(features);
    return this.generateFeatureCollection(features, store);
  }
}
