interface Rule {
    type: string;
    minZoom?: number;
}
export default interface NotificationElement {
    type: string;
    message: string;
    rule: Rule;
}
export {};
