import mapboxgl from "mapbox-gl";
import { MapConst } from "./const";

export class MapContainer {
  private map: mapboxgl.Map | null = null;
  private initialized = false;
  private static instance: MapContainer;

  private constructor() {
  };

  public static getInstance = (): MapContainer => {
    if (!MapContainer.instance) {
      MapContainer.instance = new MapContainer();
    }

    return MapContainer.instance;
  }

  public init = () => {
    if (this.initialized) {
      return;
    };

    mapboxgl.accessToken = MapConst.ACCESS_TOKEN;
    this.map = new mapboxgl.Map({
      container: 'map',
      style: MapConst.StyleId.DARK,
      center: [MapConst.POINT_TOKYO_STATION .lng, MapConst.POINT_TOKYO_STATION.lat],
      zoom: 14
    });

    const point = this.map.project(new mapboxgl.LngLat( -71.093161, 42.358871));
    
    console.log(point.x, point.y);
  };

  public getMap(): mapboxgl.Map | null {
    if (this.map) {
      return this.map;
    };
    return null;
  };
}