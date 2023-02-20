import { useStore } from '../composable/store';

export default class CustomStyleSelection {
  static setCustomStyleWithouInfoBox() {
    const options = useStore().getOptions();
    useStore().setCustomDisplay(options.search.displaySearch);
    const customCSS = options.search.displaySearch ? 'small' : 'no-box';
    useStore().setTargetBoxSize(customCSS);
  }
}
