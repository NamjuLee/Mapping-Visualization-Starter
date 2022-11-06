import { SolutionBase, Core, KeyboardEventData } from '../../Core/index';
export class Solution extends SolutionBase {

    pts: number[][] = [];
    constructor(core: Core) {
        super(core);
    }
    render(ctx: CanvasRenderingContext2D) {
        for (let i = 0; i < this.pts.length; ++i) { 
            const projected = this.core.toScreen(this.pts[i][0], this.pts[i][1]); 
            renderPoint(ctx, projected[0], projected[1], this.core.t);
        }
        const pos = this.core.toScreen(-71.093161, 42.358871);
        renderPoint(ctx, pos[0], pos[1], this.core.t);

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
    mouseDrag(x: number, y: number): void {
        console.log('mouse drag')
    }
    mouseClick(x: number, y: number): void {
        const mapProjected = this.core.ToMap(x, y);
        this.pts.push(mapProjected);
    }
    mouseMove(x: number, y: number) {

    }
}

const renderPoint = (ctx: CanvasRenderingContext2D, x: number, y: number, t: number) => {
    ctx.fillStyle = 'rgba(0,255,45,0.753)';
    ctx.beginPath();
    ctx.arc(x, y, (Math.sin(t * 0.8) + 4) * 4, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
}