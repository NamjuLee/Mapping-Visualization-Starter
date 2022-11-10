import MapView from "@arcgis/core/views/MapView";
import Map from "@arcgis/core/Map";
import { useEffect } from 'react';
import './App.css';

import { App as apps } from './app/index';


function App() {
  
  useEffect(() => {
    const map = new Map({
      basemap: "dark-gray-vector" // topo, dark-gray-vector, streets, streets-night-vector
    });

    const view = new MapView({
      container: 'root',
      map,
      zoom: 15,
      center: [-71.0933575, 42.3591654]
    });
    view.when(() => {
      apps.init(view);
    });
  });


  return (
    <div className="App">
      <header className="App-header">
      </header>
    </div>
  );
}

export default App;
