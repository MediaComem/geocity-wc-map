import GeojsonConfig from '../types/geojson-config';
import WFSConfiguration from '../types/wfs-config';
import wmtsLayerConfiguration from '../components/wmts-loader';
import InformationElement from '../types/information-element';
import ModeConfig from '../types/mode';
import ClusterConfig from '../types/cluster-config';
import NotificationElement from '../types/notification-element';
import GeolocationInformation from '../types/geolocation-information';
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
    enableDraw: boolean;
    maxNbDraw: number;
    drawElement: string;
    onlyOneDraw: boolean;
    enableRotation: boolean;
    information: InformationElement;
    mode: ModeConfig;
    cluster: ClusterConfig;
    geojson: GeojsonConfig;
    geolocationInformation: GeolocationInformation;
    notifications: Array<NotificationElement>;
    wfs: WFSConfiguration;
    wmts: wmtsLayerConfiguration;
    inclusionArea: boolean;
    targetBoxMessage: string;
}
export default class Options {
    static getOptions(options: IOption): IOption;
}
