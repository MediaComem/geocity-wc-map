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

  static webComponentOptions(options: IOption) {
    const result: IOption = {
      zoom: 15,
      minZoom: 1,
      maxZoom: 20,
      interaction: {
        displayZoom: true,
        displayScaleLine: false,
        fullscreen: true,
        enableGeolocation: false,
        enableCenterButton: true,
        enableRotation: true,
      },
      defaultCenter: [2539057, 1181111],
      information: {
        duration: 5000,
        title: 'This is a title',
        content: 'This is a content',
      },
      mode: {
          type: ''
      },
      cluster: {
        distance: 40,
        minDistance: 30,
      },
      geolocationInformation: {
        displayBox: true,
        reverseLocation: false,
        currentLocation: false,
      },
      notifications: [],
      wfs: {
        url: '',
      },
      wmts: [{
        capability: 'https://wmts.geo.admin.ch/EPSG/2056/1.0.0/WMTSCapabilities.xml',
        layer: 'ch.swisstopo.pixelkarte-grau',
        projection: 'EPSG:2056',
        name: '',
        thumbnail: ''
      }],
      inclusionArea: {
        url: '',
        filter: ''
      },
      selectionTargetBoxMessage: '',
      search: {
        displaySearch: true,
        requestWithoutCustomValue: 'https://api3.geo.admin.ch/rest/services/api/SearchServer?limit=5&&type=locations&sr=2056&lang=fr&origins=address%2Cparcel',
        bboxRestiction: '2523099.818000,1167985.282000,2549752.141000,1192697.773000'
      },
      border: {
        url: '',
        notification: '' 
      },
      outputFormat: 'GeometryCollection'
    };
    if (options.zoom !== undefined) result.zoom = options.zoom;
    if (options.minZoom !== undefined) result.minZoom = options.minZoom;
    if (options.maxZoom !== undefined) result.maxZoom = options.maxZoom;
    if (options.interaction !== undefined) result.interaction = options.interaction;
    if (options.search !== undefined) result.search = options.search;
    if (options.defaultCenter !== undefined && options.defaultCenter[0] !== null) result.defaultCenter = options.defaultCenter;
    if (options.information !== undefined) result.information = options.information;
    if (options.notifications !== undefined && options.notifications.length > 0) result.notifications = options.notifications;
    if (options.mode !== undefined) result.mode = options.mode;
    if (options.cluster !== undefined) result.cluster = options.cluster;
    if (options.geolocationInformation !== undefined) result.geolocationInformation = options.geolocationInformation;
    if (options.wfs !== undefined) result.wfs = options.wfs;
    if (options.wmts !== undefined) result.wmts = options.wmts;
    if (options.inclusionArea !== undefined) result.inclusionArea = options.inclusionArea;
    if (options.selectionTargetBoxMessage !== undefined) result.selectionTargetBoxMessage = options.selectionTargetBoxMessage;
    if (options.border !== undefined) result.border = options.border;
    if (options.outputFormat !== undefined) result.outputFormat = options.outputFormat;
    return result;
  }
}
