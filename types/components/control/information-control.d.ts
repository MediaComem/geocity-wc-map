import Control from "ol/control/Control";
import InformationBoxControl from '../notification/information-box';
import { Store } from '../../composable/store';
import { Map } from 'ol';
export default class InformationControl extends Control {
    informationIsOpen: Boolean;
    control: InformationBoxControl;
    constructor(target: HTMLElement, store: Store, map: Map);
    closeInformationBox(): void;
    openInformationBox(): void;
    toogleInformationBox(): void;
}
