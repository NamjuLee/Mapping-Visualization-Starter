import EsriMap = require("esri/Map");
import MapView = require("esri/views/MapView");
import Basemap = require("esri/Basemap");
import { App } from './app/App';

const id = 'viewDiv';

const map = new EsriMap({
  basemap: "dark-gray-vector" as any as Basemap
});

const view = new MapView({
  map: map,
  container: id,
});

view.when( ()=> {
  App.init(view);
});

