import NotificationElement from '../types/notification-element';
import NotificationBoxControl from './notification/notification';
import Control from 'ol/control/Control';
import Feature from 'ol/Feature';
declare class ControlNotificationContainer extends Control {
    div: HTMLElement;
    static style: import("lit").CSSResult[];
    constructor();
}
export default class NotificationManager {
    validZoomConstraint: boolean;
    validAreaConstraint: boolean;
    validMaxElementConstraint: boolean;
    notificationControl: ControlNotificationContainer;
    zoomNotificationControl: NotificationBoxControl | undefined;
    inclusionNotificationControl: NotificationBoxControl | undefined;
    maxElementNotificationControl: NotificationBoxControl | undefined;
    infosNotificationControl: NotificationBoxControl | undefined;
    constructor();
    setupTargetMode(): void;
    setupSelectMode(): void;
    setupCreateMode(): void;
    setup(notifications: Array<NotificationElement>): void;
    setupZoomContraint(rule: NotificationElement): void;
    setupInclusionAreaConstraint(rule: NotificationElement): void;
    setupMaxSelectionConstraint(rule: NotificationElement): void;
    hasValidZoom(rule: NotificationElement): boolean | 0 | undefined;
    checkZoomConstraint(rule: NotificationElement): void;
    checkInclusionAreaConstraint(isInInclusionArea: boolean, couldBypass: boolean | undefined): void;
    checkMaxElementContraint(features: Array<Feature>): void;
    generateExportData(features: Array<Feature>): Object[];
}
export {};
