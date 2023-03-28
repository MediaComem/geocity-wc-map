import { Control } from "ol/control";
import { Map as olMap } from 'ol';
import { Store } from "../../composable/store";
export default class SearchLocationControl extends Control {
    div: HTMLElement;
    constructor(store: Store, map: olMap);
}
