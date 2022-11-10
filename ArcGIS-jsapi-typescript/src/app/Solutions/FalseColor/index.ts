import { SolutionBase, Core } from '../../Core/index';
import { getFalseColor } from 'njscore';
export class Solution extends SolutionBase {

    pts: number[][] = [];
    colorArray: number[][] = [];
    constructor(core: Core) {
        super(core);
    }
    public init(ctx: CanvasRenderingContext2D): void {
        this.colorArray = [];
        for (let i = 0 ; i < 255; ++i) {
            const result = getFalseColor(i / 255);
            this.colorArray.push(result);
        }
        console.log(this.colorArray.length);
        console.log('init done')

    }
    public render(ctx: CanvasRenderingContext2D) {
        console.log('rendering..', this.colorArray.length)
        for (let i = 0; i < this.pts.length; ++i) { 
            const projected = this.core.toScreen(this.pts[i][0], this.pts[i][1]); 
            renderPoint(ctx, projected[0], projected[1], this.core.t);
        }
        const pos = this.core.toScreen(-71.093161, 42.358871);
        renderPoint(ctx, pos[0], pos[1], this.core.t);

        const xOff = 100;
        const yOff = ctx.canvas.height - 100;
        const w = 2;
        const h = 20;
        for (let i = 0 ; i < this.colorArray.length; ++i) {

            ctx.beginPath();
            ctx.rect(i * w + xOff, yOff, w, h)
            ctx.closePath();
            ctx.fillStyle = `rgba(${this.colorArray[i][0]}, ${this.colorArray[i][1]}, ${this.colorArray[i][2]}, 1)`;
            ctx.fill();
        }
    }
    mouseClick(x: number, y: number): void {
        const mapProjected = this.core.ToMap(x, y);
        this.pts.push(mapProjected);
    }
}
const renderPoint = (ctx: CanvasRenderingContext2D, x: number, y: number, t: number) => {
    ctx.fillStyle = 'rgba(0,255,45,0.753)';
    ctx.beginPath();
    ctx.arc(x, y, (Math.sin(t * 0.8) + 4) * 4, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
}