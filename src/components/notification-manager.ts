import Map from 'ol/Map.js';
import { useStore } from '../composable/store';
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
    rules: Array<NotificationElement>;
    theme: string;
    hasWarning: boolean = false;
    eventToSend: any = undefined;

    constructor(map: Map, rules: Array<NotificationElement>) {
        this.map = map;
        this.rules = rules;
        this.theme = useStore().getTheme();
        this.checkRules()
        window.addEventListener('current-center-position', (event) => {
            this.eventToSend = event;
            if (!this.hasWarning) {
                GeocityEvent.sendEvent('valid-event', this.eventToSend);
            }
        })
    }

    checkRules() {
        this.rules.forEach((rule: NotificationElement) => {
            if (rule.rule.type === 'ZOOM_CONSTRAINT') this.zoomContraint(rule, this.theme)
            if (rule.type === 'info' && !this.hasWarning) this.map.addControl(new NotificationBoxControl(rule, this.theme))
            if (!this.hasWarning && this.eventToSend !== undefined) {
                GeocityEvent.sendEvent('valid-event', this.eventToSend);
            }
        })
    }

    hasValidZoom(rule: NotificationElement) {
        const currentZoom = this.map.getView().getZoom()
        return currentZoom && rule.rule.minZoom && currentZoom < rule.rule.minZoom
    }

    zoomContraint(rule: NotificationElement, theme: string) {
        if (this.hasValidZoom(rule)) {
            this.map.addControl(new NotificationBoxControl(rule, theme))
            this.hasWarning = true;
        } 
        
        this.map.getView().on('change:resolution', () => {
            if (!this.hasValidZoom(rule)) {
                this.map.getControls().forEach((control) => {
                    if (control instanceof NotificationBoxControl && control.ruleType === 'ZOOM_CONSTRAINT') {
                        this.map.removeControl(control);
                        this.hasWarning = false;
                        this.checkRules();
                    }
                });
            }
            else {
                if (this.map.getControls().getArray().find((control) => control instanceof NotificationBoxControl && control.ruleType === 'ZOOM_CONSTRAINT') === undefined) {
                    this.map.addControl(new NotificationBoxControl(rule, theme))
                    this.hasWarning = true;
                    GeocityEvent.sendEvent('invalid-event', {});
                }   
            }
        })
    }
}