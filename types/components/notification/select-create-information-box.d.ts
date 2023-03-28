import { Control } from 'ol/control';
import { Store } from '../../composable/store';
export default class SelectCreateInformationBoxController extends Control {
    div: HTMLElement;
    constructor(store: Store);
    disable(): void;
    show(): void;
    hide(): void;
}
