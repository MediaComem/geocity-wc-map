import { useStore } from '../../composable/store';
import NotificationElement from '../../types/notification-element';
import { GeocityEvent } from '../../utils/geocity-event';
import NotificationBoxControl from '../notification/notification';

import Feature from 'ol/Feature';
import { Point } from 'ol/geom';
import EventManager from '../../utils/event-manager';
import { EventTypes } from 'ol/Observable';
import OutputFormat from '../../utils/output-format';

export default class NotificationManager {
    validZoomConstraint: boolean = true;
    validAreaConstraint: boolean = true;
    validBorderContraint: boolean = true;
    validMaxElementConstraint: boolean = true;
    displayMaxElementConstraint: boolean = false;
    zoomNotificationControl: NotificationBoxControl | undefined;
    inclusionNotificationControl: NotificationBoxControl | undefined;
    maxElementNotificationControl: NotificationBoxControl | undefined;
    infosNotificationControl: NotificationBoxControl | undefined;
    borderContraintNotificationControl: NotificationBoxControl | undefined;
    outputFormat: OutputFormat = new OutputFormat();

    constructor() {
        const options = useStore().getOptions();
        switch (options.mode.type) {
            case 'target': this.setupTargetMode(); break;
            case 'select': this.setupSelectMode(); break;
            case 'create': this.setupCreateMode(); break;
            case 'mix': this.setupMixMode(); break;
            default: useStore().getMap().addControl(new NotificationBoxControl({
                type: "error",
                message: "Veuillez sélectionner un mode de fonctionnement valide.",
                rule: {
                    type: "NOT_VALID_MODE"
                }
            } as NotificationElement))
        }    
        this.setup(options.notifications)
        this.displayRightNotification();
    }

    displayRightNotification() {
        if (!this.validZoomConstraint) {
            this.zoomNotificationControl?.show();
            this.inclusionNotificationControl?.hide();
            this.maxElementNotificationControl?.hide();
            this.infosNotificationControl?.hide();
            this.borderContraintNotificationControl?.hide();
        } else if (!this.validBorderContraint) {
            this.zoomNotificationControl?.hide();
            this.inclusionNotificationControl?.hide();
            this.maxElementNotificationControl?.hide();
            this.infosNotificationControl?.hide();
            this.borderContraintNotificationControl?.show();
        } else if (!this.validAreaConstraint) {
            this.zoomNotificationControl?.hide();
            this.inclusionNotificationControl?.show();
            this.maxElementNotificationControl?.hide();
            this.infosNotificationControl?.hide();
            this.borderContraintNotificationControl?.hide();
        } else if (this.displayMaxElementConstraint) {
            this.zoomNotificationControl?.hide();
            this.inclusionNotificationControl?.hide();
            this.maxElementNotificationControl?.show();
            this.infosNotificationControl?.hide();
            this.borderContraintNotificationControl?.hide();
        } else {
            this.zoomNotificationControl?.hide();
            this.inclusionNotificationControl?.hide();
            this.maxElementNotificationControl?.hide();
            this.infosNotificationControl?.show();
            this.borderContraintNotificationControl?.hide();
        }
    }

    setupTargetMode() {
        window.addEventListener('current-center-position', ((event: CustomEvent) => {
            if (this.validZoomConstraint && this.validAreaConstraint) {
                GeocityEvent.sendEvent('position-selected', this.outputFormat.generateTargetGeometry(event.detail));
            }
        }) as EventListener)
    }

    iconClickedListener() {
        window.addEventListener('icon-clicked', ((event: CustomEvent) => {
            const features = useStore().getSelectedFeatures();
            if (this.validZoomConstraint && features.length > 0) {
                this.checkMaxElementContraint(features);
                if (this.validMaxElementConstraint) {
                    GeocityEvent.sendEvent('position-selected', this.outputFormat.generateExportData(features));
                }
                GeocityEvent.sendEvent('authorize-clicked', event.detail);
            }
            this.displayRightNotification();
        }) as EventListener);
    }

    setupSelectMode() {
        this.iconClickedListener();
        this.ruleValidationListener();    
    }

    iconCreatedListener() {
        window.addEventListener('icon-created', ((event: CustomEvent) => {
            const features = useStore().getSelectedFeatures();
            this.checkMaxElementContraint(features);
            this.checkIsInBorder(features);
            if (this.validZoomConstraint && this.validMaxElementConstraint && features.length > 0 && this.validBorderContraint) {
                GeocityEvent.sendEvent('position-selected', this.outputFormat.generateExportData(features));
                GeocityEvent.sendEvent('authorize-created', event.detail);
            } else {
                GeocityEvent.sendEvent('refused-created', event.detail);
            }

            
            this.displayRightNotification();
        }) as EventListener)


        window.addEventListener('icon-removed', () => {
            GeocityEvent.sendEvent('position-selected', undefined);
            GeocityEvent.sendEvent('remove-created-icon', undefined);
        })
    }

    setupCreateMode() {
        this.iconCreatedListener();
        this.ruleValidationListener();       
    }

    ruleValidationListener() {
        window.addEventListener('rule-validation', () => {
            const features = useStore().getSelectedFeatures();
            this.checkMaxElementContraint(features);
            if (this.validZoomConstraint && this.validMaxElementConstraint && features.length > 0) {
                GeocityEvent.sendEvent('position-selected', this.outputFormat.generateExportData(features));
            } else {
                GeocityEvent.sendEvent('position-selected', undefined);
            }
            this.displayRightNotification();
        })
    }

    setupMixMode() {
        this.iconClickedListener();
        this.iconCreatedListener();
        this.ruleValidationListener();    
    }

    setup(notifications: Array<NotificationElement>) {
        notifications.forEach((notification: NotificationElement) => {
            if (notification.rule.type === 'ZOOM_CONSTRAINT') this.setupZoomContraint(notification)
            if (notification.rule.type === 'AREA_CONSTRAINT') this.setupInclusionAreaConstraint(notification)
            if (notification.rule.type === 'MAX_SELECTION') this.setupMaxSelectionConstraint(notification)
            if (notification.type === 'info') {
                this.infosNotificationControl = new NotificationBoxControl(notification)
                useStore().getMap().addControl(this.infosNotificationControl);
            }
        })
        if (useStore().getOptions().border.url !== '') {
            this.borderContraintNotificationControl = new NotificationBoxControl({
                type: "warning",
                message:useStore().getOptions().border.notification,
                rule: {
                    type: "BORDER_CONSTRAINT"
                }
            } as NotificationElement)
            this.borderContraintNotificationControl.hide();
            useStore().getMap().addControl(this.borderContraintNotificationControl)
        }
    }

    setupZoomContraint(rule: NotificationElement) {
        this.zoomNotificationControl = new NotificationBoxControl(rule);
        this.zoomNotificationControl.disable();
        useStore().getMap().addControl(this.zoomNotificationControl)

        if (this.hasValidZoom(rule)) {
            this.validZoomConstraint = false; 
        }

        EventManager.registerBorderConstaintMapEvent('change:resolution' as EventTypes,  () => {
            this.checkZoomConstraint(rule);
            this.displayRightNotification();
        })
    }

    setupInclusionAreaConstraint(rule: NotificationElement) {
        this.inclusionNotificationControl = new NotificationBoxControl(rule);
        this.inclusionNotificationControl.disable();
        useStore().getMap().addControl(this.inclusionNotificationControl)
        window.addEventListener('inclusion-area-included', ((event: CustomEvent) => {
            this.checkInclusionAreaConstraint(event.detail, rule.rule.couldBypass);
            this.displayRightNotification();
        }) as EventListener);
    }

    setupMaxSelectionConstraint(rule: NotificationElement) {
        const maxElement = rule.rule.maxElement;
        if (maxElement !== undefined) useStore().setMaxElement(maxElement);
        rule.message = rule.message.replace('{x}', `${maxElement}`);
        this.maxElementNotificationControl = new NotificationBoxControl(rule);
        this.maxElementNotificationControl.disable();
        useStore().getMap().addControl(this.maxElementNotificationControl)
    }

    hasValidZoom(rule: NotificationElement) {
        const currentZoom = useStore().getMap().getView().getZoom()
        return currentZoom && rule.rule.minZoom && currentZoom < rule.rule.minZoom
    }

    checkZoomConstraint(rule: NotificationElement) {
        if (!this.hasValidZoom(rule)) {
            this.validZoomConstraint = true;        
            GeocityEvent.sendEvent('rule-validation', undefined);        
        }
        else {
            this.validZoomConstraint = false;
            GeocityEvent.sendEvent('position-selected', undefined);
        }
    }

    checkInclusionAreaConstraint(isInInclusionArea: boolean, couldBypass: boolean | undefined) {
        if (isInInclusionArea) {
            this.validAreaConstraint = true;
        }
        else {
            if (couldBypass) this.validAreaConstraint = true;
            else {
                this.validAreaConstraint = false;
                if (useStore().getOptions().mode.type === 'target') {
                    GeocityEvent.sendEvent('position-selected', undefined);
                } else {
                    setTimeout(() => {
                        this.validAreaConstraint = true;
                        this.displayRightNotification();
                    }, 2000)
                }
            };
        }
    }

    checkMaxElementContraint(features: Array<Feature>) {
        if (useStore().getMaxElement() >= 0) {
            if (features.length >= useStore().getMaxElement()) {
                if (useStore().getMaxElement() === 1 && features.length === useStore().getMaxElement()) {
                    this.validMaxElementConstraint = true;
                    this.displayMaxElementConstraint = false;
                }
                else if (features.length > useStore().getMaxElement()) {
                    this.validMaxElementConstraint = false;
                    this.displayMaxElementConstraint = true;
                }
            } else {
                this.validMaxElementConstraint = true;
                this.displayMaxElementConstraint = false;
            }
        }
    }

    checkIsInBorder(features: Array<Feature>) {
        if (useStore().getOptions().border.url !== '') {
            const feature: Feature = features[features.length - 1]
            const geom: Point | undefined = feature.getGeometry() as Point;
            const isInBorder = useStore().getBorderConstraint()?.getSource()?.getFeatures()[0].getGeometry()?.intersectsCoordinate(geom.getCoordinates())
            if (isInBorder) {
                this.validBorderContraint = true;
            } else {
                this.validBorderContraint = false;
                this.displayRightNotification();
                setTimeout(() => {
                    this.validBorderContraint = true;
                    this.displayRightNotification();
                }, 2000)
            }
        } else {
            this.validBorderContraint = true;
        }   
    }
}