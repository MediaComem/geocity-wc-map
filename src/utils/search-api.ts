export default class SearchApi {
    static getAddressFromCoordinate(coordinate: number[])  {
        return fetch(`https://api3.geo.admin.ch/rest/services/api/MapServer/identify?mapExtent=0,0,100,100&imageDisplay=100,100,100&tolerance=20&geometryType=esriGeometryPoint&geometry=${coordinate[0]},${coordinate[1]}&layers=all:ch.bfs.gebaeude_wohnungs_register&returnGeometry=false&sr=2056`)
        .then((result) => result.json());
    }
}