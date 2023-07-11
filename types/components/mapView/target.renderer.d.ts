import { Render } from '../../utils/render';
import VectorSource from 'ol/source/Vector.js';
import IStates from '../../utils/states';
export default class TargetRenderer {
    vectorSource: VectorSource;
    renderUtils: Render;
    constructor(renderUtils: Render);
    renderCurrentSelection(states: IStates): void;
    removeCurrentSelection(): void;
}
