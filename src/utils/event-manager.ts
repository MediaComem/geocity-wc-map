import { Map } from 'ol';
import BaseEvent from 'ol/events/Event';
import { EventTypes } from 'ol/Observable';
import IOption from './options';

export default class EventManager {
  static setEvent(
    eventName: EventTypes,
    listener: (event: BaseEvent) => unknown,
    map: Map
  ) {
    map.getView().on(eventName, listener);
  }

  static unsetEvent(
    eventName: EventTypes,
    listener: (event: BaseEvent) => unknown,
    map: Map
  ) {
    map.getView().on(eventName, listener);
  }

  static registerWindowListener(
    windowEvent: string,
    eventName: EventTypes,
    listener: (event: BaseEvent) => unknown,
    map: Map
  ) {
    window.addEventListener(windowEvent, () => {
      EventManager.unsetEvent(eventName, listener, map);
      EventManager.setEvent(eventName, listener, map);
    });
  }

  static registerBorderConstaintMapEvent(
    eventName: EventTypes,
    listener: (event: BaseEvent) => unknown,
    map: Map,
    options: IOption
  ) {
    if (options.border.url !== '') {
      // In case of border constraint, the view is replaced so all the events on the view is vanished.
      // We need to reset all the events. The unset is to ensure no side effects.
      EventManager.registerWindowListener(
        'border-contraint-enabled',
        eventName,
        listener,
        map
      );
    }
    EventManager.setEvent(eventName, listener, map);
  }

  static setCursorEvent(map: Map) {
    map.on('movestart', () => {
      map.getViewport().style.cursor = "all-scroll";
    });
    map.on('moveend', () => {
      map.getViewport().style.cursor = "default";
    });
  }


  static setResizeEvent(div: HTMLElement, variable: string, map: Map) {
    const size = map.getSize();
    if (size) {
      div.style.setProperty(variable, size[0] *  0.33 + 'px') 
    }

    map.on('change:size', () => {
      const size = map.getSize();
      if (size) {
        div.style.setProperty(variable, size[0] *  0.33 + 'px') 
      }
    })
  }
}
