define(["require", "exports", "esri/geometry/Point"], function (require, exports, Point) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Core {
        constructor(app, view) {
            this.smoothingEnabled = true;
            this.then = 0;
            this.interval = 0;
            this.last = 0;
            this.asyncSafeGuard = 0;
            this.app = app;
            this.mView = view;
            this.initView();
            this.initCanvas();
        }
        initView() {
            this.mView.center = new Point({
                x: -71.093161,
                y: 42.358871
            }),
                this.mView.zoom = 16;
        }
        initCanvas() {
            this.eventInteraction = new EventInteraction(this);
            this.mPoint = this.mView.toMap({ x: 0, y: 0 });
            this.canvas = document.createElement('canvas');
            this.canvas.id = 'App';
            this.canvas.style.zIndex = '1';
            this.canvas.style.position = 'absolute';
            this.canvas.style.pointerEvents = 'none';
            this.ctx = this.canvas.getContext('2d');
            this.app.divHost.appendChild(this.canvas);
            this.ctx.globalCompositeOperation = 'source-over';
            this.canvas.width = this.app.divHost.clientWidth;
            this.canvas.height = this.app.divHost.clientHeight;
            this.start(this.ctx);
        }
        start(ctx) {
            this.t = 0.0;
            this.init(ctx);
            this.Draw(ctx);
        }
        Draw(ctx) {
            requestAnimationFrame(() => { this.Draw(ctx); });
            this.t += 0.1;
            this.Clear(ctx);
            this.render(ctx);
        }
        Clear(ctx) {
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        }
        ResizeCanvas(width, height) {
            this.ctx.canvas.width = width;
            this.ctx.canvas.height = height;
        }
        toScreen(long, lat) {
            this.mPoint.longitude = long;
            this.mPoint.latitude = lat;
            this.mPoint.spatialReference.wkid = 102100;
            let p = this.mView.toScreen(this.mPoint);
            return [p.x, p.y]; // screen X Y
        }
        ToMap(x, y) {
            let mp = this.mView.toMap({ x: x, y: y }).clone();
            return [mp.longitude, mp.latitude, mp.x, mp.y];
        }
        MouseEvent(m) {
            if (m.type === MOUSE_TYPE.DOWN) {
                this.mouseDown(m.x, m.y);
                return;
            }
            if (m.type === MOUSE_TYPE.UP) {
                this.mouseUp(m.x, m.y);
                return;
            }
            if (m.type === MOUSE_TYPE.CLICK) {
                this.mouseClick(m.x, m.y);
                return;
            }
            if (m.isDown && m.type === MOUSE_TYPE.MOVE) {
                this.mouseDrag(m.x, m.y);
                return;
            }
            else {
                this.mouseMove(m.x, m.y);
                return;
            }
        }
        // ...................................................
        init(ctx) {
            // Bind needed
        }
        render(ctx) {
            // Bind needed
        }
        keyEvent(k) {
            // Bind needed
        }
        mouseClick(x, y) {
            // Bind needed
        }
        mouseDown(x, y) {
            // Bind needed
        }
        mouseUp(x, y) {
            // Bind needed
        }
        mouseDrag(x, y) {
            // Bind needed
        }
        mouseMove(x, y) {
            // Bind needed
        }
    }
    exports.Core = Core;
    class SolutionBase {
        constructor(core) {
            this.core = core;
            this.init(this.core.ctx);
            this.core.render = (ctx) => this.render(ctx);
            this.core.keyEvent = (k) => this.keyDown(k);
            this.core.mouseDown = (x, y) => this.mouseDown(x, y);
            this.core.mouseUp = (x, y) => this.mouseUp(x, y);
            this.core.mouseClick = (x, y) => this.mouseClick(x, y);
            this.core.mouseMove = (x, y) => this.mouseMove(x, y);
        }
        init(ctx) { }
        ;
        render(ctx) { }
        ;
        mouseDown(x, y) { }
        ;
        mouseUp(x, y) { }
        ;
        mouseClick(x, y) { }
        ;
        mouseMove(x, y) { }
        ;
        keyDown(k) { }
        ;
    }
    exports.SolutionBase = SolutionBase;
    var MOUSE_TYPE;
    (function (MOUSE_TYPE) {
        MOUSE_TYPE["DOWN"] = "DOWN";
        MOUSE_TYPE["UP"] = "UP";
        MOUSE_TYPE["MOVE"] = "MOVE";
        MOUSE_TYPE["CLICK"] = "CLICK";
        MOUSE_TYPE["DRAG"] = "DRAG";
    })(MOUSE_TYPE = exports.MOUSE_TYPE || (exports.MOUSE_TYPE = {}));
    class EventInteraction {
        constructor(app) {
            this.app = app;
            EventInteraction.mouseEventDataPre = new MouseEventData();
            this.InitArcGISMapEventV4x();
        }
        InitArcGISMapEventV4x() {
            this.app.mView.on('pointer-down', (e) => {
                const ev = this.CommonEventBuilderArcGIS(e);
                ev.type = MOUSE_TYPE.DOWN;
                this.app.MouseEvent(ev);
            });
            this.app.mView.on('pointer-up', (e) => {
                const ev = this.CommonEventBuilderArcGIS(e);
                ev.type = MOUSE_TYPE.UP;
                this.app.MouseEvent(ev);
            });
            this.app.mView.on('click', (e) => {
                const ev = this.CommonEventBuilderArcGIS(e);
                ev.type = MOUSE_TYPE.CLICK;
                this.app.MouseEvent(ev);
            });
            // this.app.mView.on('pointer-drag', (e: any) => {
            //     const ev = this.CommonEventBuilderArcGIS(e);
            //     ev.type = MOUSE_TYPE.DRAG;
            //     this.app.MouseEvent(ev);
            // });
            this.app.mView.on('pointer-move', (e) => {
                const ev = this.CommonEventBuilderArcGIS(e);
                ev.type = MOUSE_TYPE.MOVE;
                this.app.MouseEvent(ev);
            });
            this.app.mView.on('key-down', (e) => {
                let keyPressed = e.key;
                if (keyPressed.slice(0, 5) === 'Arrow' || e.key === '-' || e.key === '=' || e.key === 'd') {
                    e.stopPropagation();
                }
                this.KeyDownJSAPI4X(e.native);
            });
        }
        MouseClickLeftArcGIS(e) {
            let mEvent = this.CommonEventBuilderArcGIS(e);
            this.app.MouseEvent(mEvent);
        }
        CommonEventBuilderArcGIS(e) {
            let mEvent = new MouseEventData();
            mEvent.preX = EventInteraction.mouseEventDataPre.x;
            mEvent.preY = EventInteraction.mouseEventDataPre.y;
            // mEvent.premEvent = EventInteraction.mouseEventDataPre;
            mEvent.x = e.x;
            mEvent.y = e.y;
            mEvent.yGLPicking = e.native.target.getBoundingClientRect().bottom - e.native.clientY;
            mEvent.pressedShift = e.native.shiftKey;
            mEvent.pressedAlt = e.native.altKey;
            mEvent.pressedCtrl = e.native.ctrlKey;
            mEvent.native = e.native;
            EventInteraction.mouseEventDataPre = mEvent;
            return mEvent;
        }
        KeyDownJSAPI4X(k) {
            let kEventData = this.CommonEventBuilder(k);
            this.app.keyEvent(kEventData);
        }
        CommonEventBuilder(k) {
            let kEvent = new KeyboardEventData();
            kEvent.key = k.key;
            kEvent.keyCode = k.keyCode;
            kEvent.code = k.code;
            kEvent.hasCtrlKey = k.ctrlKey;
            kEvent.hasShiftKey = k.shiftKey;
            kEvent.hasAltKey = k.altKey;
            kEvent.hasMetaCommand = k.metaKey;
            return kEvent;
        }
    }
    exports.EventInteraction = EventInteraction;
    class MouseEventData {
        constructor() {
            this.x = -1;
            this.y = -1;
            this.z = -1;
            this.preX = -1;
            this.preY = -1;
            this.preZ = -1;
            this.isDown = false;
            this.isDoubleClick = false;
            this.isMove = false;
            this.pressedShift = false;
            this.pressedAlt = false;
            this.pressedCtrl = false;
            this.lat = -1;
            this.long = -1;
            this.wheel = 0;
            this.preWheel = 0;
        }
        DeepCopy() {
            let mEvent = new MouseEventData();
            mEvent.x = this.x;
            mEvent.y = this.y;
            mEvent.z = this.z;
            mEvent.preX = this.preX;
            mEvent.preY = this.preY;
            mEvent.preZ = this.preZ;
            mEvent.pressedAlt = this.pressedAlt;
            mEvent.pressedShift = this.pressedShift;
            mEvent.pressedCtrl = this.pressedCtrl;
            mEvent.isDoubleClick = this.isDoubleClick;
            mEvent.isDown = this.isDown;
            mEvent.isMove = this.isMove;
            mEvent.lat = this.lat;
            mEvent.long = this.long;
            mEvent.wheel = this.wheel;
            mEvent.preWheel = this.preWheel;
            mEvent.yGLPicking = this.yGLPicking;
            mEvent.native = this.native;
            return mEvent;
        }
    }
    exports.MouseEventData = MouseEventData;
    class KeyboardEventData {
        constructor() {
            //
        }
    }
    exports.KeyboardEventData = KeyboardEventData;
});
//# sourceMappingURL=index.js.map