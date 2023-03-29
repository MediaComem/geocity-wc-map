import WFSConfiguration from '../types/wfs-config';
import wmtsLayerConfiguration from '../components/mapView/wmts-loader';
import InformationElement from '../types/information-element';
import ModeConfig from '../types/mode';
import ClusterConfig from '../types/cluster-config';
import SearchConfig from '../types/search-config';
import BorderConfig from '../types/border-config';
import NotificationElement from '../types/notification-element';
import InteractionConfig from '../types/interaction-config';
import GeolocationInformation from '../types/geolocation-information';
import InclusionAreaConfig from '../types/inclusion-area-config';
export default interface IOption {
    zoom: number;
    minZoom: number;
    maxZoom: number;
    interaction: InteractionConfig;
    defaultCenter: Array<number>;
    information: InformationElement;
    mode: ModeConfig;
    cluster: ClusterConfig;
    geolocationInformation: GeolocationInformation;
    notifications: Array<NotificationElement>;
    wfs: WFSConfiguration;
    wmts: Array<wmtsLayerConfiguration>;
    inclusionArea: InclusionAreaConfig;
    selectionTargetBoxMessage: string;
    search: SearchConfig;
    border: BorderConfig;
    outputFormat: string;
}
export default class Options {
    static webComponentOptions(options: IOption): IOption;
}
