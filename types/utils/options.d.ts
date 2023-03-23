import WFSConfiguration from '../types/wfs-config';
import wmtsLayerConfiguration from '../components/mapView/wmts-loader';
import InformationElement from '../types/information-element';
import ModeConfig from '../types/mode';
import ClusterConfig from '../types/cluster-config';
import SearchConfig from '../types/search-config';
import BorderConfig from '../types/border-config';
import NotificationElement from '../types/notification-element';
import GeolocationInformation from '../types/geolocation-information';
import InclusionAreaConfig from '../types/inclusion-area-config';
export default interface IOption {
    zoom: number;
    minZoom: number;
    maxZoom: number;
    displayZoom: boolean;
    displayScaleLine: boolean;
    fullscreen: boolean;
    defaultCenter: Array<number>;
    enableGeolocation: boolean;
    enableCenterButton: boolean;
    enableRotation: boolean;
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
}
export default class Options {
    constructor(options: IOption);
}
