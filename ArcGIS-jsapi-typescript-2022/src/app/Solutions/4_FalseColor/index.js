define(["require", "exports", "../../Core/index"], function (require, exports, index_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Solution extends index_1.SolutionBase {
        constructor(core) {
            super(core);
            this.pts = [];
        }
        render(ctx) {
            for (let i = 0; i < this.pts.length; ++i) {
                const projected = this.core.toScreen(this.pts[i][0], this.pts[i][1]);
                renderPoint(ctx, projected[0], projected[1], this.core.t);
            }
            const pos = this.core.toScreen(-71.093161, 42.358871);
            renderPoint(ctx, pos[0], pos[1], this.core.t);
        }
        keyDown(k) {
            console.log('key pressed', k);
        }
        mouseDown(x, y) {
            console.log('mouse down');
        }
        mouseUp(x, y) {
            console.log('mouse up');
        }
        mouseDrag(x, y) {
            console.log('mouse drag');
        }
        mouseClick(x, y) {
            const mapProjected = this.core.ToMap(x, y);
            this.pts.push(mapProjected);
        }
        mouseMove(x, y) {
        }
    }
    exports.Solution = Solution;
    const renderPoint = (ctx, x, y, t) => {
        ctx.fillStyle = 'rgba(0,255,45,0.753)';
        ctx.beginPath();
        ctx.arc(x, y, (Math.sin(t * 0.8) + 4) * 4, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    };
});
//# sourceMappingURL=index.js.map