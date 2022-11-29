import { LitElement } from 'lit';
/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
export declare class OpenLayersElement extends LitElement {
    mapElement: HTMLDivElement;
    constructor();
    firstUpdated(): void;
    render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult;
}
declare global {
    interface HTMLElementTagNameMap {
        'openlayers-element': OpenLayersElement;
    }
}
