import { Feature } from "ol";
import GeoJSON from "ol/format/GeoJSON";
import { MultiPoint, Geometry } from "ol/geom";
export default class OutputFormat {
    geojsonFormat: GeoJSON;
    convertToMultiPoint(coordinate: number[]): Feature<MultiPoint>;
    formatGeometryCollection(geometries: Geometry[]): string;
    formatFeatureCollection(features: Feature[]): string;
    generateGeometryCollection(features: Array<Feature>): string;
    generateFeatureCollection(features: Feature[]): string;
    generateTargetGeometry(coordinate: number[]): string | undefined;
    generateExportData(features: Array<Feature>): string;
}
