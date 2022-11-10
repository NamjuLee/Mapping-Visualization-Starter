import { SolutionBase, Core, KeyboardEventData } from '../../Core/index';

export class Solution extends SolutionBase {

    pts: number[][] = [];
    constructor(core: Core) {
        super(core);
        console.log(window.location)
        console.log(process.env.PUBLIC_URL)
    }
    init() {
        console.log(process.env.PUBLIC_URL + '/static/EN_flower_dataset_clean.csv');
        getCSV(process.env.PUBLIC_URL + '/static/EN_flower_dataset_clean.csv').then((d) => {
            let count = 0;
            let latSum = 0;
            let lonSum = 0;
            const line = d.split(/\r\n|\r|\n/g);
            for (let i = 1; i < line.length; ++i) {
                const values = line[i].split(',');
                const lon = +values[4];
                const lat = +values[5];
                if (lon !== 0 || lat !== 0) {
                    // console.log(lon, lat);
                    
                    this.pts.push([lon, lat]);
                    count++;
                    latSum += lat;
                    lonSum += lon;
                }
            }
            console.log(count)
            this.core.mViewCenter(lonSum / count, latSum / count);
            // for (let i = 0 ; i < d['dataset'].length; ++i) {
            //     console.log(d['dataset'][i]['id'])
            //     if (d['dataset'][i]['id'] === 'university') {
            //       d['dataset'][i].data.forEach( (pos: any) => {
            //             this.ptsUni.push([pos['lon'], pos['lat']]);
            //       });
            //     } else if (d['dataset'][i]['id'] === 'book_store') {
            //         d['dataset'][i].data.forEach( (pos: any) => {
            //               this.ptsBook.push([pos['lon'], pos['lat']]);
            //         });
            //     } else if (d['dataset'][i]['id'] === 'library') {
            //         d['dataset'][i].data.forEach( (pos: any) => {
            //               this.ptsLib.push([pos['lon'], pos['lat']]);
            //         });
            //     } 

            // }
        })
    }
    render(ctx: CanvasRenderingContext2D) {
        ctx.globalCompositeOperation = 'screen' ; //'lighten';

        for (let i = 0; i < this.pts.length; ++i) { 
            const projected = this.core.toScreen(this.pts[i][0], this.pts[i][1]); 
            renderPoint(ctx, projected[0], projected[1], this.core.t + 3, 'rgba(255, 0, 0, 0.85)' );
        }

    }
    keyDown(k: KeyboardEventData): void {
        console.log('key pressed', k);
    }
    mouseDown(x: number, y: number): void {
        console.log('mouse down')
    }
    mouseUp(x: number, y: number): void {
        console.log('mouse up')
    }
    mouseClick(x: number, y: number): void {
        const mapProjected = this.core.ToMap(x, y);
        this.pts.push(mapProjected);
    }
    mouseMove(x: number, y: number) {

    }
}

const renderPoint = (ctx: CanvasRenderingContext2D, x: number, y: number, t: number, color: string) => {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, (Math.sin(t * 0.8) + 4) * 2, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
}
export const getCSV = async (url: string) => {
    return await (await fetch(url)).text();
};