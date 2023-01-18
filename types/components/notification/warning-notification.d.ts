import Control from "ol/control/Control";
interface WarningConfiguration {
    textColor: string;
    backgroundColor: string;
}
interface WarningElement {
    configuration: WarningConfiguration;
    message: string;
}
export default class WarningNotification extends Control {
    constructor(warningConfiguration: WarningElement);
}
export {};
