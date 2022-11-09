import MapView from 'esri/views/MapView';
import { Core } from './Core/index';
import { version } from 'njscore';
export class App {
    static init(view: MapView) {
        console.debug('app init....!!!');
        console.log('njscore', version);
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
        // return import('./Solutions/Starter').then(({ Solution }) => {
        // return import('./Solutions/ThirdPlace').then(({ Solution }) => {
        return import('./Solutions/flower').then(({ Solution }) => {
            new Solution(this.core);
        }).catch((err) => { console.log('Stop loading Apps.'); console.log(err); });
    }
}