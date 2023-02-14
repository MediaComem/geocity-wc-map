import NotificationElement from '../types/notification-element';
export default class NotificationManager {
    validZoomConstraint: boolean;
    validAreaConstraint: boolean;
    constructor();
    setupTargetMode(): void;
    setupSelectMode(): void;
    setupCreateMode(): void;
    setup(notifications: Array<NotificationElement>): void;
    setupZoomContraint(rule: NotificationElement): void;
    setupInclusionAreaConstraint(rule: NotificationElement): void;
    hasValidZoom(rule: NotificationElement): boolean | 0 | undefined;
    checkZoomConstraint(rule: NotificationElement): void;
    checkInclusionAreaConstraint(rule: NotificationElement, isInInclusionArea: boolean): void;
}
