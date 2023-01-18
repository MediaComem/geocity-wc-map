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
        drawElement: string;
        onlyOneDraw: boolean;
        enableRotation: boolean;
        information: {
            duration: number;
            title: string;
            content: string;
        };
        info: {
            configuration: {
                textColor: string;
                backgroundColor: string;
            };
            message: string;
        };
        warning: {
            configuration: {
                textColor: string;
                backgroundColor: string;
            };
            message: string;
        };
        error: {
            configuration: {
                textColor: string;
                backgroundColor: string;
            };
            message: string;
        };
        geojson: {
            url: string;
        };
        wfs: {
            url: string;
            projection: string;
            projectionDefinition: string;
        };
        wmts: {
            capability: string;
            layer: string;
            projection: string;
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
