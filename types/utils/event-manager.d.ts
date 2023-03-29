import { Map } from 'ol';
import BaseEvent from 'ol/events/Event';
import { EventTypes } from 'ol/Observable';
import IOption from './options';
export default class EventManager {
    static setEvent(eventName: EventTypes, listener: (event: BaseEvent) => unknown, map: Map): void;
    static unsetEvent(eventName: EventTypes, listener: (event: BaseEvent) => unknown, map: Map): void;
    static registerWindowListener(windowEvent: string, eventName: EventTypes, listener: (event: BaseEvent) => unknown, map: Map): void;
    static registerBorderConstaintMapEvent(eventName: EventTypes, listener: (event: BaseEvent) => unknown, map: Map, options: IOption): void;
    static setCursorEvent(map: Map): void;
    static setResizeEvent(div: HTMLElement, variable: string, map: Map): void;
}
