import GeojsonConfig from '../types/geojson-config';
import WFSConfiguration from '../types/wfs-config';
import wmtsLayerConfiguration from '../components/wmts-loader';
import InformationElement from '../types/information-element';
import ModeConfig from '../types/mode';
import ClusterConfig from '../types/cluster-config';
import SearchConfig from '../types/search-config';
import NotificationElement from '../types/notification-element';
import GeolocationInformation from '../types/geolocation-information';
import { useStore } from '../composable/store';

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
  inclusionArea: string;
  selectionTargetBoxMessage: string;
  search: SearchConfig;
}

export default class Options {
  static getOptions(options: IOption) {
    const result: IOption = {
      zoom: 15,
      minZoom: 1,
      maxZoom: 20,
      displayZoom: true,
      displayScaleLine: false,
      fullscreen: true,
      defaultCenter: [2539057, 1181111],
      enableGeolocation: false,
      enableCenterButton: true,
      enableDraw: true,
      maxNbDraw: 0,
      drawElement: 'Point',
      onlyOneDraw: false,
      enableRotation: true,
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
      geojson: {
        url: '',
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
      wmts: {
        capability: 'https://wmts.geo.admin.ch/EPSG/2056/1.0.0/WMTSCapabilities.xml',
        layer: 'ch.swisstopo.swissimage',
        projection: 'EPSG:2056',
      },
      inclusionArea: '',
      selectionTargetBoxMessage: '',
      search: {
        displaySearch: true,
        requestWithoutCustomValue: 'https://api3.geo.admin.ch/rest/services/api/SearchServer?limit=5&&type=locations&sr=2056&lang=fr&origins=address%2Cparcel',
        bboxRestiction: '2523099.818000,1167985.282000,2549752.141000,1192697.773000'
      }
    };
    if (options.zoom !== undefined) result.zoom = options.zoom;
    if (options.minZoom !== undefined) result.minZoom = options.minZoom;
    if (options.maxZoom !== undefined) result.maxZoom = options.maxZoom;
    if (options.displayZoom !== undefined) result.displayZoom = options.displayZoom;
    if (options.search !== undefined) result.search = options.search;
    if (options.displayScaleLine !== undefined)
      result.displayScaleLine = options.displayScaleLine;
    if (options.fullscreen !== undefined) result.fullscreen = options.fullscreen;
    if (options.defaultCenter !== undefined) result.defaultCenter = options.defaultCenter;
    if (options.enableGeolocation !== undefined)
      result.enableGeolocation = options.enableGeolocation;
    if (options.enableCenterButton !== undefined)
      result.enableCenterButton = options.enableCenterButton;
    if (options.enableDraw !== undefined) result.enableDraw = options.enableDraw;
    if (options.maxNbDraw !== undefined) result.maxNbDraw = options.maxNbDraw;
    if (options.drawElement !== undefined) result.drawElement = options.drawElement;
    if (options.onlyOneDraw !== undefined) result.onlyOneDraw = options.onlyOneDraw;
    if (options.enableRotation !== undefined) result.enableRotation = options.enableRotation;
    if (options.information !== undefined) result.information = options.information;
    if (options.notifications !== undefined && options.notifications.length > 0) result.notifications = options.notifications;
    if (options.mode !== undefined) result.mode = options.mode;
    if (options.cluster !== undefined) result.cluster = options.cluster;
    if (options.geojson !== undefined) result.geojson = options.geojson;
    if (options.geolocationInformation !== undefined) result.geolocationInformation = options.geolocationInformation;
    if (options.wfs !== undefined) result.wfs = options.wfs;
    if (options.wmts !== undefined) result.wmts = options.wmts;
    if (options.inclusionArea !== undefined) result.inclusionArea = options.inclusionArea;
    if (options.selectionTargetBoxMessage !== undefined) result.selectionTargetBoxMessage = options.selectionTargetBoxMessage;
    useStore().setOptions(result);
  }
}
