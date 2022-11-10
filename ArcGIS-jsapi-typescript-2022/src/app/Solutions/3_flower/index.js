var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
define(["require", "exports", "../../Core/index"], function (require, exports, index_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Solution extends index_1.SolutionBase {
        constructor(core) {
            super(core);
            this.pts = [];
            this.ptsUni = [];
            this.ptsBook = [];
            this.ptsLib = [];
        }
        init() {
            exports.getJSON('https://raw.githubusercontent.com/NamjuLee/data/master/Boston/thrid-place/ThridPlaceBoston.json').then((d) => {
                for (let i = 0; i < d['dataset'].length; ++i) {
                    console.log(d['dataset'][i]['id']);
                    if (d['dataset'][i]['id'] === 'university') {
                        d['dataset'][i].data.forEach((pos) => {
                            this.ptsUni.push([pos['lon'], pos['lat']]);
                        });
                    }
                    else if (d['dataset'][i]['id'] === 'book_store') {
                        d['dataset'][i].data.forEach((pos) => {
                            this.ptsBook.push([pos['lon'], pos['lat']]);
                        });
                    }
                    else if (d['dataset'][i]['id'] === 'library') {
                        d['dataset'][i].data.forEach((pos) => {
                            this.ptsLib.push([pos['lon'], pos['lat']]);
                        });
                    }
                }
            });
        }
        render(ctx) {
            ctx.globalCompositeOperation = 'screen'; //'lighten';
            for (let i = 0; i < this.ptsUni.length; ++i) {
                const projected = this.core.toScreen(this.ptsUni[i][0], this.ptsUni[i][1]);
                renderPoint(ctx, projected[0], projected[1], this.core.t, 'rgba(0, 255, 0, 0.6)');
            }
            for (let i = 0; i < this.ptsBook.length; ++i) {
                const projected = this.core.toScreen(this.ptsBook[i][0], this.ptsBook[i][1]);
                renderPoint(ctx, projected[0], projected[1], this.core.t + 1, 'rgba(0, 0, 255, 0.6)');
            }
            for (let i = 0; i < this.ptsLib.length; ++i) {
                const projected = this.core.toScreen(this.ptsLib[i][0], this.ptsLib[i][1]);
                renderPoint(ctx, projected[0], projected[1], this.core.t + 2, 'rgba(255, 0, 0, 0.6)');
            }
            for (let i = 0; i < this.pts.length; ++i) {
                const projected = this.core.toScreen(this.pts[i][0], this.pts[i][1]);
                renderPoint(ctx, projected[0], projected[1], this.core.t + 3, 'rgba(255, 255, 255, 0.6)');
            }
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
        mouseClick(x, y) {
            const mapProjected = this.core.ToMap(x, y);
            this.pts.push(mapProjected);
        }
        mouseMove(x, y) {
        }
    }
    exports.Solution = Solution;
    const renderPoint = (ctx, x, y, t, color) => {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, (Math.sin(t * 0.8) + 4) * 2, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    };
    exports.getJSON = (url) => __awaiter(this, void 0, void 0, function* () {
        return yield (yield fetch(url)).json();
    });
});
//# sourceMappingURL=index.js.map