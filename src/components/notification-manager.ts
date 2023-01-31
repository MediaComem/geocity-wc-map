import Map from 'ol/Map.js';
import NotificationElement from '../types/notification-element';
import NotificationBoxControl from './notification/notification';

/* 
    ZOOM_CONSTRAINT
    AREA_CONSTRAINT
    PROXIMITY_INFORMATION
    MAX_SELECTION
*/

export default class NotificationManager {
    map: Map;
    rules: Array<NotificationElement>;
    mode: string;
    hasWarning: boolean = false;

    constructor(map: Map, rules: Array<NotificationElement>, mode: string) {
        this.map = map;
        this.rules = rules;
        this.mode = mode;
        this.checkRules()
    }

    checkRules() {
        this.rules.forEach((rule: NotificationElement) => {
            if (rule.rule.type === 'ZOOM_CONSTRAINT') this.zoomContraint(rule, this.mode)
            if (rule.type === 'info' && !this.hasWarning) this.map.addControl(new NotificationBoxControl(rule, this.mode))
        })
    }

    hasValidZoom(rule: NotificationElement) {
        const currentZoom = this.map.getView().getZoom()
        return currentZoom && rule.rule.minZoom && currentZoom < rule.rule.minZoom
    }

    zoomContraint(rule: NotificationElement, mode: string) {
        if (this.hasValidZoom(rule)) {
            this.map.addControl(new NotificationBoxControl(rule, mode))
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
                    this.map.addControl(new NotificationBoxControl(rule, mode))
                    this.hasWarning = true;
                }   
            }
        })
    }
}