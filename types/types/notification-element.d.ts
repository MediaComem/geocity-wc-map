interface Rule {
    type: string;
    minZoom?: number;
    couldBypass?: boolean;
}
export default interface NotificationElement {
    type: string;
    message: string;
    rule: Rule;
}
export {};
