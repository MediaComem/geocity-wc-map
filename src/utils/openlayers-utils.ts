import { Map } from 'ol';
import InformationBox from '../components/information-box';

export default class OpenLayersUtils {
  static informationIsOpen : Boolean = false;

  static closeInformationBox(map: Map) {
    map.getControls().forEach((control) => {
      if (control instanceof InformationBox) {
        map.removeControl(control);
      }
    });
    this.informationIsOpen = !this.informationIsOpen;
  }
}
