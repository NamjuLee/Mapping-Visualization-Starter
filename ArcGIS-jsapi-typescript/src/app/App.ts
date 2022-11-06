import MapView = require("esri/views/MapView");
import { Core } from './Core/index';

export class App {
    static init(view: MapView) {
        console.debug('app init....!!!');
        new App(view);
    }
    public divHost: HTMLElement;
    public core: Core;
    constructor(view: MapView) {
        this.divHost = view.container;
        this.core = new Core(this, view);
        this.execution();
    }
    async execution() {
        return import('./Solutions/Starter/index').then(({ Solution }) => {
        // return import('./Solutions/ThirdPlace/index').then(({ Solution }) => {
            new Solution(this.core);
        }).catch((err) => { console.log('Stop loading Apps.'); console.log(err); });
    }
}