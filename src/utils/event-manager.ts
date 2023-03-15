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
      // In case of border constraint, the view is replaced so all the events on the view is vanished.
      // We need to reset all the events. The unset is to ensure no side effects.
      EventManager.registerWindowListener(
        'border-contraint-enabled',
        eventName,
        listener
      );
    }
    EventManager.setEvent(eventName, listener);
  }

  static setCursorEvent() {
    useStore().getMap().on('movestart', () => {
      useStore().getMap().getViewport().style.cursor = "all-scroll";
    });
    useStore().getMap().on('moveend', () => {
      useStore().getMap().getViewport().style.cursor = "default";
    });
  }


  static setResizeEvent(div: HTMLElement, variable: string) {
    const size = useStore().getMap().getSize();
    if (size) {
      div.style.setProperty(variable, size[0] *  0.33 + 'px') 
    }
      
    window.addEventListener('resize', () => {
      const size = useStore().getMap().getSize();
      if (size) {
        div.style.setProperty(variable, size[0] *  0.33 + 'px') 
      }
    })
  }
}
