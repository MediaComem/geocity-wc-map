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
let selectedFeature: Feature | undefined;
let borderConstraint: Extent | undefined;

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

function setSelectedFeature(newVal: Feature | undefined) {
  selectedFeature = newVal;
}

function getSelectedFeature() {
  return selectedFeature;
}

function setBorderConstraint(newVal: Extent | undefined) {
  borderConstraint = newVal;
}

function getBorderConstraint() {
  return borderConstraint;
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
    setSelectedFeature,
    getSelectedFeature,
    setBorderConstraint,
    getBorderConstraint,
  };
}
