import MapView from '@arcgis/core/views/MapView';
import { Core } from './Core';
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
        return import('./Solutions/1_Starter').then(({ Solution }) => {
        // return import('./Solutions/2_ThirdPlace').then(({ Solution }) => {
        // return import('./Solutions/3_flower').then(({ Solution }) => {
        // return import('./Solutions/4_FalseColor').then(({ Solution }) => {
            new Solution(this.core);
            // console.log(Solution);
        }).catch((err) => { console.log('Stop loading Apps.'); console.log(err); });
    }
}