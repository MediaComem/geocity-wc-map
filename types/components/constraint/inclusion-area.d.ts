import { Store } from "../../composable/store";
import VectorSource from "ol/source/Vector.js";
export default class InclusionArea {
    vectorSource: VectorSource;
    constructor(store: Store);
    couldCreate(coordiante: number[]): boolean | undefined;
}
