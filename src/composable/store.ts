import { Feature, Map } from 'ol';
import { Extent } from 'ol/extent';
import Geolocation from 'ol/Geolocation';
import IOption from '../utils/options';

let theme: string = '';
let customDisplay: boolean = false;
let targetBoxSize: string = '';
let geolocation: Geolocation | undefined;
let options: IOption;
let map: Map;
let selectedFeatures: Array<Feature> = [];
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

function addSelectedFeature(newVal: Feature) {
  selectedFeatures.push(newVal);
}

function removeSelectedFeature(id: number, objectIdName: string) {
  const index = selectedFeatures.findIndex((f) => f.get(objectIdName) === id)
  if (index !== -1) selectedFeatures.splice(index, 1);
}

function getSelectedFeature(id: number, objectIdName: string) {
  const index = selectedFeatures.findIndex((f) => f.get(objectIdName) === id)
  return index !== -1 ? selectedFeatures[index] : undefined;
}

function getSelectedFeatures() {
  return selectedFeatures
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
    getSelectedFeatures,
    setBorderConstraint,
    getBorderConstraint,
    setCurrentItemId,
    getCurrentItemId,
    setMaxElement,
    getMaxElement,
  };
}
