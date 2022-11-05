import mapboxgl from "mapbox-gl";

export namespace MapConst {
  export const ACCESS_TOKEN = 'pk.eyJ1IjoiZGVzaWduanUiLCJhIjoiY2xhNGU0YWo4MDlhYzNwdHBwenVvang4eiJ9.P3sX4l_3KjdPeRRbVS1VVg'; // 'SET YOUR ACCESSTOKEN HERE!!!!'
  export const POINT_TOKYO_STATION = new mapboxgl.LngLat( -71.093161, 42.358871);

  // Maps service | API | Mapbox - https://docs.mapbox.com/api/maps/#styles
  export namespace StyleId {
    export const STREET = 'mapbox://styles/mapbox/streets-v9';
    export const DARK = 'mapbox://styles/mapbox/dark-v10';
    export const LIGHT = 'mapbox://styles/mapbox/light-v10';
  }
}