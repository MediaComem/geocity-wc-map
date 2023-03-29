import { Feature } from "ol";
import GeoJSON from "ol/format/GeoJSON";
import { MultiPoint, Geometry } from "ol/geom";
import { Store } from "../composable/store";
export default class OutputFormat {
    geojsonFormat: GeoJSON;
    convertToMultiPoint(coordinate: number[]): Feature<MultiPoint>;
    formatGeometryCollection(geometries: Geometry[]): string;
    formatFeatureCollection(features: Feature[]): string;
    generateGeometryCollection(features: Array<Feature>): string;
    generateFeatureCollection(features: Feature[], store: Store): string;
    generateTargetGeometry(coordinate: number[], store: Store): string | undefined;
    generateExportData(features: Array<Feature>, store: Store): string;
}
