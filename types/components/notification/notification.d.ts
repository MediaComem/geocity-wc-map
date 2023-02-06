import { Control } from 'ol/control';
import NotificationElement from '../../types/notification-element';
export default class NotificationBoxControl extends Control {
    ruleType: string;
    constructor(notification: NotificationElement, layerPosition: number);
}
