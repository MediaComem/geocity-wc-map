export class GeocityEvent {
    static sendEvent(event: string, feature: any) {
        dispatchEvent(new CustomEvent(event, {detail: feature}))
    }
}