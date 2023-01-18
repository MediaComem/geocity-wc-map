import Control from "ol/control/Control";
interface InfoConfiguration {
    textColor: string;
    backgroundColor: string;
}
interface InfoElement {
    configuration: InfoConfiguration;
    message: string;
}
export default class InfoNotification extends Control {
    constructor(infoConfiguration: InfoElement);
}
export {};
