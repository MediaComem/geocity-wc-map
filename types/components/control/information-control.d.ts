import Control from "ol/control/Control";
import InformationBoxControl from '../notification/information-box';
export default class InformationControl extends Control {
    informationIsOpen: Boolean;
    control: InformationBoxControl;
    constructor(target: HTMLElement);
    closeInformationBox(): void;
    openInformationBox(): void;
    toogleInformationBox(): void;
}
