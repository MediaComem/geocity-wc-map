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
    mode: string;
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
        maxNbDraw: number;
        enableRotation: boolean;
        mode: {
            type: string;
            radius: number;
        };
        information: {
            duration: number;
            title: string;
            content: string;
        };
        notification: {
            type: string;
            message: string;
            rule: {
                type: string;
                minZoom: number;
            };
        }[];
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
    getTheme(options: any): "dark" | "light";
    firstUpdated(): void;
    render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult[];
}
declare global {
    interface HTMLElementTagNameMap {
        'openlayers-element': OpenLayersElement;
    }
}
