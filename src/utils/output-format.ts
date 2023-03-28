import { Feature } from "ol";
import GeoJSON from "ol/format/GeoJSON";
import { MultiPoint, Geometry, GeometryCollection, Point } from "ol/geom";
import { useStore } from "../composable/store";

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

  generateFeatureCollection(features: Feature[]) {
    const outputFeatures: Feature[] = [];
    features.forEach((feature) => {
      const geometry = feature.getGeometry();
      if (geometry) {
        const point: Point = geometry as Point;
        const multiPoint = this.convertToMultiPoint(point.getCoordinates());
        if (multiPoint) {
          const id = feature.get('objectid');
          if (id && useStore().getCurrentFeatureType(id) === 'select')
            multiPoint.set('objectid', id);
          outputFeatures.push(multiPoint);
        }
      }
    });
    return this.formatFeatureCollection(outputFeatures);
  }

  generateTargetGeometry(coordinate: number[]) {
    const multiPoint = this.convertToMultiPoint(coordinate);
    if (multiPoint) {
      if (useStore().getOptions().outputFormat === 'GeometryCollection') {
        const geometry = multiPoint.getGeometry();
        if (geometry) return this.formatGeometryCollection([geometry]);
        return undefined;
      }
      return this.formatFeatureCollection([multiPoint]);
    }
    return undefined;
  }

  generateExportData(features: Array<Feature>) {
    if (useStore().getOptions().outputFormat === 'GeometryCollection')
      return this.generateGeometryCollection(features);
    return this.generateFeatureCollection(features);
  }
}
