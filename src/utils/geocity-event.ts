export class GeocityEvent {
    static sendEvent(feature: any) {
        dispatchEvent(new CustomEvent('geocity-wfs-event', {detail: feature}))
    }
}