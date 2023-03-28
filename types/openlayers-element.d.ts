import { LitElement } from 'lit';
import View from 'ol/View.js';
import SingleSelect from './components/mode/select';
import IOption from './utils/options';
import GeolocationInformation from './types/geolocation-information';
import { Store } from './composable/store';
import InclusionArea from './components/constraint/inclusion-area';
import SingleCreate from './components/mode/create';
import TargetRenderer from './components/mapView/target.renderer';
import { Render } from './utils/render';
/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
export declare class OpenLayersElement extends LitElement {
    mapElement: HTMLDivElement;
    view: View | undefined;
    modeControllers: Array<SingleCreate | SingleSelect | TargetRenderer>;
    renderUtils: Render;
    inclusionArea: InclusionArea | undefined;
    options: {};
    states: {};
    store: Store;
    constructor();
    connectedCallback(): void;
    setupTheme(options: any): void;
    setupCustomDisplay(options: IOption): void;
    setupTargetBoxSize(geolocationInformation: GeolocationInformation): void;
    firstUpdated(): void;
    updated(changedProperties: any): void;
    render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult[];
}
declare global {
    interface HTMLElementTagNameMap {
        'openlayers-element': OpenLayersElement;
    }
}
