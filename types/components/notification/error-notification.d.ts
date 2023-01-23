import Control from "ol/control/Control";
interface ErrorConfiguration {
    textColor: string;
    backgroundColor: string;
}
interface ErrorElement {
    configuration: ErrorConfiguration;
    message: string;
}
export default class ErrorNotification extends Control {
    constructor(errorConfiguration: ErrorElement);
}
export {};
