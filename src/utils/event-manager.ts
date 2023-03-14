import BaseEvent from 'ol/events/Event';
import { EventTypes } from 'ol/Observable';
import { useStore } from '../composable/store';

export default class EventManager {
  static setEvent(
    eventName: EventTypes,
    listener: (event: BaseEvent) => unknown
  ) {
    const map = useStore().getMap();
    map.getView().on(eventName, listener);
  }

  static unsetEvent(
    eventName: EventTypes,
    listener: (event: BaseEvent) => unknown
  ) {
    const map = useStore().getMap();
    map.getView().on(eventName, listener);
  }

  static registerWindowListener(
    windowEvent: string,
    eventName: EventTypes,
    listener: (event: BaseEvent) => unknown
  ) {
    window.addEventListener(windowEvent, () => {
      EventManager.unsetEvent(eventName, listener);
      EventManager.setEvent(eventName, listener);
    });
  }

  static registerBorderConstaintMapEvent(
    eventName: EventTypes,
    listener: (event: BaseEvent) => unknown
  ) {
    const options = useStore().getOptions();
    if (options.border.url !== '') {
      EventManager.registerWindowListener(
        'border-contraint-enabled',
        eventName,
        listener
      );
    }
    EventManager.setEvent(eventName, listener);
  }
}
