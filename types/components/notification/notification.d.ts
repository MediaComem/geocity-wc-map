import { Control } from 'ol/control';
import NotificationElement from '../../types/notification-element';
import { Map } from 'ol';
export default class NotificationBoxControl extends Control {
    ruleType: string;
    div: HTMLElement;
    constructor(notification: NotificationElement, map: Map);
    disable(): void;
    show(): void;
    hide(): void;
}
