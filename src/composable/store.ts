import { Feature, Map } from 'ol';
import Geolocation from 'ol/Geolocation';
import { Geometry } from 'ol/geom';
import VectorLayer from 'ol/layer/Vector';
import { Vector } from 'ol/source';
import StoreFeature from '../types/store-feature';
import IOption from '../utils/options';

export class Store {

  static geolocation: Geolocation | undefined;
  static theme: string = '';

  customDisplay: boolean = false;
  targetBoxSize: string = '';
  options: IOption | undefined;
  map: Map | undefined;
  selectedFeatures: Array<StoreFeature> = [];
  borderConstraint: VectorLayer<Vector<Geometry>> | undefined;
  currentItemId: number = -1;
  maxElement: number = -1;

  static setTheme(newVal: string) {
    this.theme = newVal;
  }

  static getTheme() {
    return this.theme;
  }

  static setGeolocation(newVal: Geolocation) {
    this.geolocation = newVal;
  }

  static getGeolocation() {
    return this.geolocation;
  }

  setCustomDisplay(newVal: boolean) {
    this.customDisplay = newVal;
  }

  isCustomDisplay() {
    return this.customDisplay;
  }

  setTargetBoxSize(newVal: string) {
    this.targetBoxSize = newVal;
  }

  getTargetBoxSize() {
    return this.targetBoxSize;
  }

  setOptions(newVal: IOption) {
    this.options = newVal;
  }

  getOptions() {
    return this.options;
  }

  setMap(newVal: Map) {
    this.map = newVal;
  }

  getMap() {
    return this.map;
  }

  addSelectedFeature(newVal: Feature, id: number, type: string) {
    this.selectedFeatures.push({
      id: id,
      type: type,
      feature: newVal
    });
  }

  removeSelectedFeature(id: number) {
    const index = this.selectedFeatures.findIndex((f) => f.id === id)
    if (index !== -1) this.selectedFeatures.splice(index, 1);
  }

  removeLastSelectedFeature() {
    this.selectedFeatures.splice(-1);
  }

  removeAllSelectedFeatures() {
    this.selectedFeatures = [];
  }

  getSelectedFeature(id: number) {
    const index = this.selectedFeatures.findIndex((f) => f.id === id)
    return index !== -1 ? this.selectedFeatures[index].feature : undefined;
  }

  getCurrentFeatureType(id: number) {
    const index = this.selectedFeatures.findIndex((f) => f.id === id)
    return index !== -1 ? this.selectedFeatures[index].type : '';
  }

  unselectFeatures() {
    this.selectedFeatures.find((f) => f.feature.get('isSelected'))?.feature.set('isSelected', undefined);
  }

  getSelectedFeatures() {
    return this.selectedFeatures.map((f) => f.feature);
  }

  setBorderConstraint(newVal: VectorLayer<Vector<Geometry>> | undefined) {
    this.borderConstraint = newVal;
  }

  getBorderConstraint() {
    return this.borderConstraint;
  }

  setCurrentItemId(newVal: number) {
    this.currentItemId = newVal;
  }

  getCurrentItemId() {
    return this.currentItemId;
  }

  setMaxElement(newVal: number) {
    this.maxElement = newVal;
  }

  getMaxElement() {
    return this.maxElement;
  }
}
