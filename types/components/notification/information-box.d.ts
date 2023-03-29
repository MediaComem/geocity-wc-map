import { Control } from 'ol/control';
import { Store } from '../../composable/store';
export default class InformationBoxControl extends Control {
    div: HTMLElement;
    constructor(store: Store);
    show(): void;
    hide(): void;
}
