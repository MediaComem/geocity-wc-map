import { LitElement } from 'lit';
import View from 'ol/View.js';
import { Geolocation } from 'ol';
/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
export declare class OpenLayersElement extends LitElement {
    mapElement: HTMLDivElement;
    theme: string;
    view: View | undefined;
    geolocation: Geolocation | undefined;
    options: {};
    constructor();
    connectedCallback(): void;
    getTheme(options: any): "light" | "dark";
    firstUpdated(): void;
    render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult[];
}
declare global {
    interface HTMLElementTagNameMap {
        'openlayers-element': OpenLayersElement;
    }
}
