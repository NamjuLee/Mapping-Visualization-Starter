import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import { App } from './app';
import "./style.css";

const map = new Map({
  basemap: "dark-gray-vector" // topo, dark-gray-vector, streets, streets-night-vector
});

const view = new MapView({
  container: "viewDiv",
  map,
  zoom: 15,
  center: [-71.0933575, 42.3591654]
});

view.when(() => {
  App.init(view);
});
