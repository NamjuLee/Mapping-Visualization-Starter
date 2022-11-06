import { MapContainer } from "./Scene0/map";
import { example } from "./Scene1/map";

const main = (): void => {

  if (true) {
    example();
  } else {
    MapContainer.getInstance().init();
  }
}

main();