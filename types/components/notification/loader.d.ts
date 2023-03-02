import Control from 'ol/control/Control';
export default class LoaderBoxControl extends Control {
    constructor(message: string);
    disable(): void;
    show(): void;
    hide(): void;
}
