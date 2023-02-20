import { Feature, Map } from 'ol';
import { Extent } from 'ol/extent';
import Geolocation from 'ol/Geolocation';
import IOption from '../utils/options';
declare function setTheme(newVal: string): void;
declare function getTheme(): string;
declare function setCustomDisplay(newVal: boolean): void;
declare function isCustomDisplay(): boolean;
declare function setTargetBoxSize(newVal: string): void;
declare function getTargetBoxSize(): string;
declare function setGeolocation(newVal: Geolocation): void;
declare function getGeolocation(): Geolocation | undefined;
declare function setOptions(newVal: IOption): void;
declare function getOptions(): IOption;
declare function setMap(newVal: Map): void;
declare function getMap(): Map;
declare function addSelectedFeature(newVal: Feature): void;
declare function removeSelectedFeature(id: number, objectIdName: string): void;
declare function getSelectedFeature(id: number, objectIdName: string): Feature<import("ol/geom/Geometry").default> | undefined;
declare function getSelectedFeatures(): Feature<import("ol/geom/Geometry").default>[];
declare function setBorderConstraint(newVal: Extent | undefined): void;
declare function getBorderConstraint(): Extent | undefined;
<<<<<<< HEAD
=======
declare function setCurrentAddress(newVal: string): void;
declare function getCurrentAddress(): string;
declare function setCurrentItemId(newVal: number): void;
declare function getCurrentItemId(): number;
declare function setMaxElement(newVal: number): void;
declare function getMaxElement(): number;
>>>>>>> 0c9ea15 (Implement multiple create and select)
export declare function useStore(): {
    setTheme: typeof setTheme;
    getTheme: typeof getTheme;
    setCustomDisplay: typeof setCustomDisplay;
    isCustomDisplay: typeof isCustomDisplay;
    setTargetBoxSize: typeof setTargetBoxSize;
    getTargetBoxSize: typeof getTargetBoxSize;
    setGeolocation: typeof setGeolocation;
    getGeolocation: typeof getGeolocation;
    setOptions: typeof setOptions;
    getOptions: typeof getOptions;
    setMap: typeof setMap;
    getMap: typeof getMap;
    addSelectedFeature: typeof addSelectedFeature;
    removeSelectedFeature: typeof removeSelectedFeature;
    getSelectedFeature: typeof getSelectedFeature;
    getSelectedFeatures: typeof getSelectedFeatures;
    setBorderConstraint: typeof setBorderConstraint;
    getBorderConstraint: typeof getBorderConstraint;
<<<<<<< HEAD
=======
    setCurrentAddress: typeof setCurrentAddress;
    getCurrentAddress: typeof getCurrentAddress;
    setCurrentItemId: typeof setCurrentItemId;
    getCurrentItemId: typeof getCurrentItemId;
    setMaxElement: typeof setMaxElement;
    getMaxElement: typeof getMaxElement;
>>>>>>> 0c9ea15 (Implement multiple create and select)
};
export {};
