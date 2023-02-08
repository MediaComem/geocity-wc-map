import Control from "ol/control/Control";
export default class InformationControl extends Control {
    informationIsOpen: Boolean;
    constructor(shouldDisplayInformation: boolean);
    closeInformationBox(): void;
    openInformationBox(): void;
    toogleInformationBox(): void;
}
