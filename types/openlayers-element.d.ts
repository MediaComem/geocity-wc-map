import { LitElement } from 'lit';
import View from 'ol/View.js';
import { Geolocation } from 'ol';
import IOption from './utils/options';
import GeolocationInformation from './types/geolocation-information';
/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
export declare class OpenLayersElement extends LitElement {
    mapElement: HTMLDivElement;
    view: View | undefined;
    geolocation: Geolocation | undefined;
    options: {};
    constructor();
    connectedCallback(): void;
    setupTheme(options: any): void;
    setupCustomDisplay(options: IOption): void;
    setupTargetBoxSize(geolocationInformation: GeolocationInformation): void;
    firstUpdated(): void;
    render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult[];
}
declare global {
    interface HTMLElementTagNameMap {
        'openlayers-element': OpenLayersElement;
    }
}
