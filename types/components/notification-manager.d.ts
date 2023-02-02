import Map from 'ol/Map.js';
import NotificationElement from '../types/notification-element';
export default class NotificationManager {
    map: Map;
    rules: Array<NotificationElement>;
    theme: string;
    hasWarning: boolean;
    eventToSend: any;
    constructor(map: Map, rules: Array<NotificationElement>, theme: string);
    checkRules(): void;
    hasValidZoom(rule: NotificationElement): boolean | 0 | undefined;
    zoomContraint(rule: NotificationElement, theme: string): void;
}
