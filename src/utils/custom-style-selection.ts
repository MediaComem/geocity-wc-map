import { Store } from '../composable/store';

export default class CustomStyleSelection {
  static setCustomStyleWithouInfoBox(store: Store) {
    const options = store.getOptions();
    store.setCustomDisplay(options?.search?.displaySearch ?? false);
    const customCSS = options?.search.displaySearch ? 'small' : 'no-box';
    store.setTargetBoxSize(customCSS);
  }
}
