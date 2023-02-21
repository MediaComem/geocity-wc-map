import { useStore } from '../composable/store';
import NotificationElement from '../types/notification-element';
import { GeocityEvent } from '../utils/geocity-event';
import NotificationBoxControl from './notification/notification';
import wtk from 'wkt';
import Control from 'ol/control/Control';

import style from '../styles/notification.css?inline';
import { unsafeCSS } from 'lit';

/* 
    ZOOM_CONSTRAINT 1
    AREA_CONSTRAINT 2
    PROXIMITY_INFORMATION 3
    MAX_SELECTION 4
*/

class ControlNotificationContainer extends Control {
    public div: HTMLElement;

    static style = [unsafeCSS(style)];

    
    constructor() {
      const element = document.createElement('div');
      element.classList.add('control-notification-manager')
  
      super({
        element: element,
      });
  
      this.div = element;
    }
  }

export default class NotificationManager {
    validZoomConstraint: boolean = true;
    validAreaConstraint: boolean = true;
    notificationControl: ControlNotificationContainer = new ControlNotificationContainer();
    zoomNotificationControl: NotificationBoxControl | undefined;
    inclusionNotificationControl: NotificationBoxControl | undefined;
    infosNotificationControl: NotificationBoxControl | undefined;

    constructor() {
        const options = useStore().getOptions();
        switch (options.mode.type) {
            case 'target': this.setupTargetMode(); break;
            case 'select': this.setupSelectMode(); break;
            case 'create': this.setupCreateMode(); break;
            default: useStore().getMap().addControl(new NotificationBoxControl(this.notificationControl.div, {
                type: "error",
                message: "Veuillez sélectionner un mode de fonctionnement valide.",
                rule: {
                    type: "NOT_VALID_MODE"
                }
            } as NotificationElement, 4))
        }    
        useStore().getMap().addControl(this.notificationControl)
        this.setup(options.notifications)
    }

    setupTargetMode() {
        window.addEventListener('current-center-position', ((event: CustomEvent) => {
            if (this.validZoomConstraint && this.validAreaConstraint) {
                const geometry = {
                    type: "Point",
                    coordinates: event.detail
                  };
                GeocityEvent.sendEvent('position-selected', {geometry: wtk.stringify(geometry)});
            }
        }) as EventListener)
    }

    setupSelectMode() {
        window.addEventListener('icon-clicked', () => {
            const feature = useStore().getSelectedFeature();
            if (this.validZoomConstraint && feature) {
                // If the element is already selected. That means that we unselect it. In this case, we send undefined to inform the state. Otherwise, we select the element and send the coordinate
                if (feature.get('isClick')) {
                    GeocityEvent.sendEvent('position-selected', undefined);
                } else {
                    const geometry = {
                        type: "Point",
                        coordinates: feature.get('geom').getCoordinates()
                      };
                    GeocityEvent.sendEvent('position-selected', {
                        id: feature.get('objectid'),
                        geometry: wtk.stringify(geometry)
                    });
                }
                
                GeocityEvent.sendEvent('authorize-clicked', undefined);
            }
        })

        window.addEventListener('rule-validation', () => {
            const feature = useStore().getSelectedFeature();
            if (this.validZoomConstraint && feature) {
                const geometry = {
                    type: "Point",
                    coordinates: feature.get('geom').getCoordinates()
                  };
                GeocityEvent.sendEvent('position-selected', {
                    id: feature.get('name'),
                    geometry: wtk.stringify(geometry)
                });
            }
        })
    }

    setupCreateMode() {
        window.addEventListener('icon-created', () => {
            const feature = useStore().getSelectedFeature();
            if (this.validZoomConstraint && feature) {
                const geometry = {
                    type: "Point",
                    coordinates: feature.get('geometry').getCoordinates()
                  };
                GeocityEvent.sendEvent('position-selected', {
                    id: feature.get('name'),
                    geometry: wtk.stringify(geometry)
                });
            } else {
                useStore().setSelectedFeature(undefined);
                GeocityEvent.sendEvent('position-selected', undefined);
            }
            GeocityEvent.sendEvent('authorize-created', undefined);
        })

        window.addEventListener('rule-validation', () => {
            const feature = useStore().getSelectedFeature();
            if (this.validZoomConstraint && feature) {
                const geometry = {
                    type: "Point",
                    coordinates: feature.get('geometry').getCoordinates()
                  };
                GeocityEvent.sendEvent('position-selected', {
                    id: feature.get('name'),
                    geometry: wtk.stringify(geometry)
                });
            }
        })

        window.addEventListener('icon-removed', () => {
            GeocityEvent.sendEvent('position-selected', undefined);
            GeocityEvent.sendEvent('remove-created-icon', undefined);
        })
    }

    setup(notifications: Array<NotificationElement>) {
        notifications.forEach((notification: NotificationElement) => {
            if (notification.rule.type === 'ZOOM_CONSTRAINT') this.setupZoomContraint(notification)
            if (notification.rule.type === 'AREA_CONSTRAINT') this.setupInclusionAreaConstraint(notification)
            if (notification.type === 'info') {
                this.infosNotificationControl = new NotificationBoxControl(this.notificationControl.div, notification, 1)
                useStore().getMap().addControl(this.infosNotificationControl);
            }
        })
    }

    setupZoomContraint(rule: NotificationElement) {
        this.zoomNotificationControl = new NotificationBoxControl(this.notificationControl.div, rule, 3);
        this.zoomNotificationControl.disable();
        useStore().getMap().addControl(this.zoomNotificationControl)

        if (this.hasValidZoom(rule)) {
            this.validZoomConstraint = false; 
            this.zoomNotificationControl.show();
        } 
        
        useStore().getMap().getView().on('change:resolution', () => {
            this.checkZoomConstraint(rule)
        })
    }

    setupInclusionAreaConstraint(rule: NotificationElement) {
        this.inclusionNotificationControl = new NotificationBoxControl(this.notificationControl.div, rule, 2);
        this.inclusionNotificationControl.disable();
        useStore().getMap().addControl(this.inclusionNotificationControl)
        window.addEventListener('inclusion-area-included', ((event: CustomEvent) => {
            this.checkInclusionAreaConstraint(event.detail)
        }) as EventListener);
    }

    hasValidZoom(rule: NotificationElement) {
        const currentZoom = useStore().getMap().getView().getZoom()
        return currentZoom && rule.rule.minZoom && currentZoom < rule.rule.minZoom
    }

    checkZoomConstraint(rule: NotificationElement) {
        if (!this.hasValidZoom(rule)) {
            this.zoomNotificationControl?.hide()
            this.validZoomConstraint = true;        
            GeocityEvent.sendEvent('rule-validation', undefined);        
        }
        else {
            this.zoomNotificationControl?.show()
            this.validZoomConstraint = false;
            GeocityEvent.sendEvent('position-selected', undefined);
        }
    }

    checkInclusionAreaConstraint(isInInclusionArea: boolean) {
        if (isInInclusionArea) {
            this.inclusionNotificationControl?.hide();
            this.validAreaConstraint = true;
        }
        else {
            this.inclusionNotificationControl?.show();
            this.validAreaConstraint = true;
        }
    }
}