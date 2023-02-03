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
}

export default class Options {
  static getOptions(options: IOption): IOption {
    const result: IOption = {
      zoom: 15,
      minZoom: 1,
      maxZoom: 18,
      displayZoom: true,
      displayScaleLine: false,
      fullscreen: true,
      defaultCenter: [739867.251358, 5905800.079386],
      enableGeolocation: false,
      enableCenterButton: true,
      enableDraw: false,
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
          type: '',
          radius: 40
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
        reverseLocation: true,
        currentLocation: true,
      },
      notifications: [],
      wfs: {
        url: '',
        projection: 'EPSG:2056',
        projectionDefinition:
          '+proj=somerc +lat_0=46.95240555555556 +lon_0=7.439583333333333 +k_0=1 +x_0=2600000 +y_0=1200000 +ellps=bessel +towgs84=674.374,15.056,405.346,0,0,0,0 +units=m +no_defs',
      },
      wmts: {
        capability: 'https://wmts.geo.admin.ch/EPSG/3857/1.0.0/WMTSCapabilities.xml',
        layer: 'ch.swisstopo.swissimage',
        projection: 'EPSG:3857',
      },
    };
    if (options.zoom) result.zoom = options.zoom;
    if (options.minZoom) result.minZoom = options.minZoom;
    if (options.maxZoom) result.maxZoom = options.maxZoom;
    if (options.displayZoom) result.displayZoom = options.displayZoom;
    if (options.displayScaleLine)
      result.displayScaleLine = options.displayScaleLine;
    if (options.fullscreen) result.fullscreen = options.fullscreen;
    if (options.defaultCenter) result.defaultCenter = options.defaultCenter;
    if (options.enableGeolocation)
      result.enableGeolocation = options.enableGeolocation;
    if (options.enableCenterButton)
      result.enableCenterButton = options.enableCenterButton;
    if (options.enableDraw) result.enableDraw = options.enableDraw;
    if (options.maxNbDraw) result.maxNbDraw = options.maxNbDraw;
    if (options.drawElement) result.drawElement = options.drawElement;
    if (options.onlyOneDraw) result.onlyOneDraw = options.onlyOneDraw;
    if (options.enableRotation) result.enableRotation = options.enableRotation;
    if (options.information) result.information = options.information;
    if (options.notifications && options.notifications.length > 0) result.notifications = options.notifications;
    if (options.mode) result.mode = options.mode;
    if (options.cluster) result.cluster = options.cluster;
    if (options.geojson) result.geojson = options.geojson;
    if (options.geolocationInformation) result.geolocationInformation = options.geolocationInformation;
    if (options.wfs) result.wfs = options.wfs;
    if (options.wmts) result.wmts = options.wmts;
    return result;
  }
}
