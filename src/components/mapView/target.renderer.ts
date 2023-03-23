import { Vector } from 'ol/source';
import { Render } from '../../utils/render';
import VectorSource from 'ol/source/Vector.js';
import IStates from '../../utils/states';

export default class TargetRenderer {
  vectorSource: VectorSource;
  renderUtils: Render;

  constructor(renderUtils: Render) {
    this.vectorSource = new Vector();
    this.renderUtils = renderUtils;
    this.renderUtils.setupAndLoadLayer(this.vectorSource);
  }

  renderCurrentSelection(states: IStates) {
    this.renderUtils.displayCurrentElementCreateTargetMode(this.vectorSource, states);
  }
}
