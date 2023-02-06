import Map from 'ol/Map.js';
import NotificationElement from '../types/notification-element';
export default class NotificationManager {
    map: Map;
    validZoomConstraint: boolean;
    validAreaConstraint: boolean;
    constructor(map: Map, notifications: Array<NotificationElement>);
    setup(notifications: Array<NotificationElement>): void;
    setupZoomContraint(rule: NotificationElement): void;
    setupInclusionAreaConstraint(rule: NotificationElement): void;
    hasValidZoom(rule: NotificationElement): boolean | 0 | undefined;
    checkZoomConstraint(rule: NotificationElement): void;
    checkInclusionAreaConstraint(rule: NotificationElement, isInInclusionArea: boolean): void;
}
