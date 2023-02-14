import { Control } from 'ol/control';
import NotificationElement from '../../types/notification-element';
export default class NotificationBoxControl extends Control {
    ruleType: string;
    div: HTMLElement;
    constructor(target: HTMLElement, notification: NotificationElement, layerPosition: number);
}
