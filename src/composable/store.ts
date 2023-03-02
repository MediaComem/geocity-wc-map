import { Feature, Map } from 'ol';
import { Extent } from 'ol/extent';
import Geolocation from 'ol/Geolocation';
import StoreFeature from '../types/store-feature';
import IOption from '../utils/options';

let theme: string = '';
let customDisplay: boolean = false;
let targetBoxSize: string = '';
let geolocation: Geolocation | undefined;
let options: IOption;
let map: Map;
let selectedFeatures: Array<StoreFeature> = [];
let borderConstraint: Extent | undefined;
let currentItemId: number = -1;
let maxElement: number = -1;

function setTheme(newVal: string) {
  theme = newVal;
}

function getTheme() {
  return theme;
}

function setCustomDisplay(newVal: boolean) {
  customDisplay = newVal;
}

function isCustomDisplay() {
  return customDisplay;
}

function setTargetBoxSize(newVal: string) {
  targetBoxSize = newVal;
}

function getTargetBoxSize() {
  return targetBoxSize;
}

function setGeolocation(newVal: Geolocation) {
  geolocation = newVal;
}

function getGeolocation() {
  return geolocation;
}

function setOptions(newVal: IOption) {
  options = newVal;
}

function getOptions() {
  return options;
}

function setMap(newVal: Map) {
  map = newVal;
}

function getMap() {
  return map;
}

function addSelectedFeature(newVal: Feature, id: number, type: string) {
  selectedFeatures.push({
    id: id,
    type: type,
    feature: newVal
  });
}

function removeSelectedFeature(id: number) {
  const index = selectedFeatures.findIndex((f) => f.id === id)
  if (index !== -1) selectedFeatures.splice(index, 1);
}

function getSelectedFeature(id: number) {
  const index = selectedFeatures.findIndex((f) => f.id === id)
  return index !== -1 ? selectedFeatures[index].feature : undefined;
}

function getCurrentFeatureType(id: number) {
  const index = selectedFeatures.findIndex((f) => f.id === id)
  return index !== -1 ? selectedFeatures[index].type : '';
}

function unselectFeatures() {
  selectedFeatures.find((f) => f.feature.get('isSelected'))?.feature.set('isSelected', undefined);
}

function getSelectedFeatures() {
  return selectedFeatures.map((f) => f.feature);
}

function setBorderConstraint(newVal: Extent | undefined) {
  borderConstraint = newVal;
}

function getBorderConstraint() {
  return borderConstraint;
}

function setCurrentItemId(newVal: number) {
  currentItemId = newVal;
}

function getCurrentItemId() {
  return currentItemId;
}

function setMaxElement(newVal: number) {
  maxElement = newVal;
}

function getMaxElement() {
  return maxElement;
}

export function useStore() {
  return {
    setTheme,
    getTheme,
    setCustomDisplay,
    isCustomDisplay,
    setTargetBoxSize,
    getTargetBoxSize,
    setGeolocation,
    getGeolocation,
    setOptions,
    getOptions,
    setMap,
    getMap,
    addSelectedFeature,
    removeSelectedFeature,
    getSelectedFeature,
    getCurrentFeatureType,
    getSelectedFeatures,
    unselectFeatures,
    setBorderConstraint,
    getBorderConstraint,
    setCurrentItemId,
    getCurrentItemId,
    setMaxElement,
    getMaxElement,
  };
}
