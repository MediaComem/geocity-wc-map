import BaseEvent from 'ol/events/Event';
import { EventTypes } from 'ol/Observable';
export default class EventManager {
    static setEvent(eventName: EventTypes, listener: (event: BaseEvent) => unknown): void;
    static unsetEvent(eventName: EventTypes, listener: (event: BaseEvent) => unknown): void;
    static registerWindowListener(windowEvent: string, eventName: EventTypes, listener: (event: BaseEvent) => unknown): void;
    static registerBorderConstaintMapEvent(eventName: EventTypes, listener: (event: BaseEvent) => unknown): void;
    static setCursorEvent(): void;
    static setResizeEvent(div: HTMLElement, variable: string): void;
}
