import Map from 'ol/Map.js';
import NotificationElement from '../types/notification-element';
import { GeocityEvent } from '../utils/geocity-event';
import NotificationBoxControl from './notification/notification';

/* 
    ZOOM_CONSTRAINT 1
    AREA_CONSTRAINT 2
    PROXIMITY_INFORMATION 3
    MAX_SELECTION 4
*/

export default class NotificationManager {
    map: Map;
    validZoomConstraint: boolean = true;
    validAreaConstraint: boolean = true;

    constructor(map: Map, notifications: Array<NotificationElement>, mode: string) {
        this.map = map;

        if (mode === 'target') {
            window.addEventListener('current-center-position', ((event: CustomEvent) => {
                if (this.validZoomConstraint && this.validAreaConstraint) {
                    GeocityEvent.sendEvent('position-selected', event.detail);
                }
            }) as EventListener)
        }
        
        if (mode === 'select') {
            window.addEventListener('icon-clicked', ((event: CustomEvent) => {
                if (this.validZoomConstraint) {
                    // If the element is already selected. That means that we unselect it. In this case, we send undefined to inform the state. Otherwise, we select the element and send the coordinate
                    event.detail.get('isClick') ? GeocityEvent.sendEvent('position-selected', undefined) : GeocityEvent.sendEvent('position-selected', event.detail.get('geometry').getCoordinates());
                    GeocityEvent.sendEvent('valid-clicked', event.detail);
                }
            }) as EventListener)
        }
    
        this.setup(notifications)
    }

    setup(notifications: Array<NotificationElement>) {
        notifications.forEach((notification: NotificationElement) => {
            if (notification.rule.type === 'ZOOM_CONSTRAINT') this.setupZoomContraint(notification)
            if (notification.rule.type === 'AREA_CONSTRAINT') this.setupInclusionAreaConstraint(notification)
            if (notification.type === 'info') this.map.addControl(new NotificationBoxControl(notification, 1))
        })
    }

    setupZoomContraint(rule: NotificationElement) {
        if (this.hasValidZoom(rule)) {
            this.map.addControl(new NotificationBoxControl(rule, 3))
            this.validZoomConstraint = false;
        } 
        
        this.map.getView().on('change:resolution', () => {
            this.checkZoomConstraint(rule)
        })
    }

    setupInclusionAreaConstraint(rule: NotificationElement) {
        window.addEventListener('inclusion-area-included', ((event: CustomEvent) => {
            this.checkInclusionAreaConstraint(rule, event.detail)
        }) as EventListener);
    }

    hasValidZoom(rule: NotificationElement) {
        const currentZoom = this.map.getView().getZoom()
        return currentZoom && rule.rule.minZoom && currentZoom < rule.rule.minZoom
    }

    checkZoomConstraint(rule: NotificationElement) {
        if (!this.hasValidZoom(rule)) {
            this.map.getControls().forEach((control) => {
                if (control instanceof NotificationBoxControl && control.ruleType === 'ZOOM_CONSTRAINT') {
                    this.map.removeControl(control);
                    this.validZoomConstraint = true;
                }
            });
        }
        else {
            if (this.map.getControls().getArray().find((control) => control instanceof NotificationBoxControl && control.ruleType === 'ZOOM_CONSTRAINT') === undefined) {
                this.map.addControl(new NotificationBoxControl(rule, 3))
                this.validZoomConstraint = false;
                GeocityEvent.sendEvent('position-selected', undefined);
            }   
        }
    }

    checkInclusionAreaConstraint(rule: NotificationElement, isInInclusionArea: boolean) {
        if (isInInclusionArea) {
            this.map.getControls().forEach((control) => {
                if (control instanceof NotificationBoxControl && control.ruleType === 'AREA_CONSTRAINT') {
                    this.map.removeControl(control);
                    this.validAreaConstraint = true;
                }
            });
        }
        else {
            if (this.map.getControls().getArray().find((control) => control instanceof NotificationBoxControl && control.ruleType === 'AREA_CONSTRAINT') === undefined) {
                this.map.addControl(new NotificationBoxControl(rule, 2))
                this.validAreaConstraint = false;
                GeocityEvent.sendEvent('position-selected', undefined);
            }   
        }
    }
}