import Map from 'ol/Map.js';
import NotificationElement from '../types/notification-element';
export default class NotificationManager {
    map: Map;
    rules: Array<NotificationElement>;
    mode: string;
    hasWarning: boolean;
    constructor(map: Map, rules: Array<NotificationElement>, mode: string);
    checkRules(): void;
    hasValidZoom(rule: NotificationElement): boolean | 0 | undefined;
    zoomContraint(rule: NotificationElement, mode: string): void;
}
