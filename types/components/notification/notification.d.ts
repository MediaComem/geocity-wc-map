import { Control } from 'ol/control';
import NotificationElement from '../../types/notification-element';
export default class NotificationBoxControl extends Control {
    constructor(notification: NotificationElement, mode: string);
}
