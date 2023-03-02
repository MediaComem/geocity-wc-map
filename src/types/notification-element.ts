interface Rule {
  type: string;
  minZoom?: number;
  couldBypass?: boolean;
  maxElement?: number;
}

export default interface NotificationElement {
  type: string;
  message: string;
  rule: Rule;
}