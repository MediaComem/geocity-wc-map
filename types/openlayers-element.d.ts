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
    view: View | undefined;
    geolocation: Geolocation | undefined;
    options: {
        zoom: number;
        minZoom: number;
        maxZoom: number;
        displayZoom: boolean;
        displayScaleLine: boolean;
        fullscreen: boolean;
        defaultCenter: number[];
        enableGeolocation: boolean;
        enableCenterButton: boolean;
        enableDraw: boolean;
        onlyOneDraw: boolean;
        geojson: {
            url: string;
        };
        wfs: {
            url: string;
            projection: string;
            projectionDefinition: string;
        };
    };
    constructor();
    connectedCallback(): void;
    firstUpdated(): void;
    render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult[];
}
declare global {
    interface HTMLElementTagNameMap {
        'openlayers-element': OpenLayersElement;
    }
}
