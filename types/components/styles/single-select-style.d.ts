import { FeatureLike } from 'ol/Feature';
import { Style } from 'ol/style';
export default class SingleSelectStyle {
    clickImage: HTMLImageElement;
    selectImage: HTMLImageElement;
    constructor();
    clusterWithIcon(feature: FeatureLike): Style;
}
