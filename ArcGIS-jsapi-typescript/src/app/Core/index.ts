import MapView from "esri/views/MapView";
import Point from "esri/geometry/Point";
import { App } from '..';

export class Core {
    t: number;
    frameRate: number;
    canvas: HTMLCanvasElement;
    hostDiv: HTMLElement;
    id: string;

    ctx: CanvasRenderingContext2D;

    xOff: number;
    yOff: number;
    xOffCurrent: number;
    yOffCurrent: number;
    xOffPre: number;
    yOffPre: number;
    zoomFactor: number;
    zoomFactorPre: number;
    zoomFactorCurrent: number;
    div3d: HTMLDivElement;

    smoothingEnabled: boolean = true;
    // theContext: CanvasRenderingContext2D;

    dropRate: number;
    isRenderSkip: boolean;
    isLoop: boolean;
    timeLastRender: number;
    delta: number;
    now: number;
    then: number = 0;
    interval: number = 0;
    last: number = 0;

    frameVisTimer: number;
    theDate: Date;

    asyncSafeGuard: number = 0;
    app: App;
    eventInteraction: EventInteraction;

    mView: MapView;
    mPoint: Point;

    constructor(app: App, view: MapView) {
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
        this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;

        this.app.divHost.appendChild(this.canvas);
        this.ctx.globalCompositeOperation = 'source-over';
        this.canvas.width = this.app.divHost.clientWidth;
        this.canvas.height = this.app.divHost.clientHeight;

        this.start(this.ctx);
    }
    mViewCenter(lon: number, lat: number) {
        this.mView.center = new Point({x: lon, y: lat})
    }
    start(ctx: CanvasRenderingContext2D) {
        this.t = 0.0;
        this.init(ctx);
        this.Draw(ctx);
    }
    Draw(ctx: CanvasRenderingContext2D) {
        requestAnimationFrame(() => { this.Draw(ctx); });
        this.t += 0.1;
        this.Clear(ctx);
        this.render(ctx);
    }
    Clear(ctx: CanvasRenderingContext2D) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }
    ResizeCanvas(width: number, height: number) {
        this.ctx.canvas.width = width;
        this.ctx.canvas.height = height;
    }
    toScreen(long: number, lat: number): number[] {
        this.mPoint.longitude = long; this.mPoint.latitude = lat;
        this.mPoint.spatialReference.wkid = 102100;
        let p = this.mView.toScreen(this.mPoint);
        return [p.x, p.y]; // screen X Y
    }
    ToMap(x: number, y: number): number[] {
        let mp = this.mView.toMap({ x: x, y: y }).clone();
        return [mp.longitude, mp.latitude, mp.x, mp.y];
    }
    MouseEvent(m: MouseEventData) {
        if (m.type === MOUSE_TYPE.DOWN) { this.mouseDown(m.x, m.y); return; }
        if (m.type === MOUSE_TYPE.UP) { this.mouseUp(m.x, m.y); return; }
        if (m.type === MOUSE_TYPE.CLICK) { this.mouseClick(m.x, m.y); return; }
        if(m.isDown && m.type === MOUSE_TYPE.MOVE) { this.mouseDrag(m.x, m.y); return; }
        else { this.mouseMove(m.x, m.y); return; }
    }
    // ...................................................
    init(ctx: CanvasRenderingContext2D) {
        // Bind needed
    }
    render(ctx: CanvasRenderingContext2D) {
        // Bind needed
    }
    keyEvent(k: KeyboardEventData) {
        // Bind needed
    }
    mouseClick(x: number, y: number) {
        // Bind needed
    }
    mouseDown(x: number, y: number) {
        // Bind needed
    }
    mouseUp(x: number, y: number) {
        // Bind needed
    }
    mouseDrag(x: number, y: number) {
        // Bind needed
    }
    mouseMove(x: number, y: number) {
        // Bind needed
    }
} 
export abstract class SolutionBase {
    public core: Core;
    constructor(core: Core) {
        this.core = core;
        this.init(this.core.ctx);
        this.core.render = (ctx: CanvasRenderingContext2D) => this.render(ctx);
        this.core.keyEvent = (k: KeyboardEventData) => this.keyDown(k);
        this.core.mouseDown = (x: number, y: number) => this.mouseDown(x, y);
        this.core.mouseUp = (x: number, y: number) => this.mouseUp(x, y);
        this.core.mouseClick = (x: number, y: number) => this.mouseClick(x, y);
        this.core.mouseMove = (x: number, y: number) => this.mouseMove(x, y);
        
    }
    public init(ctx: CanvasRenderingContext2D): void {};
    public render(ctx: CanvasRenderingContext2D): void {};
    public mouseDown(x: number, y: number): void {};
    public mouseUp(x: number, y: number): void {};
    public mouseClick(x: number, y: number): void {};
    public mouseMove(x: number, y: number): void {};
    public keyDown(k: KeyboardEventData): void {};
}
export enum MOUSE_TYPE {
    DOWN = 'DOWN',
    UP = 'UP',
    MOVE = 'MOVE',
    CLICK = 'CLICK',
    DRAG = 'DRAG',
}
export class EventInteraction {
    static mouseEventDataPre: MouseEventData;
    app: Core
    constructor(app: Core) {
        this.app = app;
        EventInteraction.mouseEventDataPre = new MouseEventData();
        this.InitArcGISMapEventV4x();
    }
    InitArcGISMapEventV4x() {
        this.app.mView.on('pointer-down', (e: __esri.MapViewPointerDownEvent) => {
            const ev = this.CommonEventBuilderArcGIS(e);
            ev.type = MOUSE_TYPE.DOWN;
            this.app.MouseEvent(ev);
        });
        this.app.mView.on('click', (e: __esri.MapViewPointerDownEvent) => {
            const ev = this.CommonEventBuilderArcGIS(e);
            ev.type = MOUSE_TYPE.CLICK;
            this.app.MouseEvent(ev);
        });
        this.app.mView.on('pointer-drag', (e: __esri.MapViewPointerDownEvent) => {
            const ev = this.CommonEventBuilderArcGIS(e);
            ev.type = MOUSE_TYPE.DRAG;
            this.app.MouseEvent(ev);
        });
        this.app.mView.on('pointer-move', (e: __esri.MapViewPointerMoveEvent) => {
            const ev = this.CommonEventBuilderArcGIS(e);
            ev.type = MOUSE_TYPE.MOVE;
            this.app.MouseEvent(ev);
        });
        this.app.mView.on('key-down', (e: __esri.MapViewKeyDownEvent) => {
            let keyPressed = e.key;
            if (keyPressed.slice(0, 5) === 'Arrow' || e.key === '-' || e.key === '=' || e.key === 'd') {
                e.stopPropagation();
            }

            this.KeyDownJSAPI4X(e.native);
        });
    }
    MouseClickLeftArcGIS(e: __esri.MapViewClickEvent | __esri.MapViewPointerDownEvent) {
        let mEvent = this.CommonEventBuilderArcGIS(e);
        this.app.MouseEvent(mEvent);
    }
    CommonEventBuilderArcGIS(e: __esri.MapViewClickEvent | __esri.MapViewDoubleClickEvent |
        __esri.MapViewPointerUpEvent | __esri.MapViewPointerDownEvent | __esri.MapViewDragEvent): MouseEventData {
        let mEvent: MouseEventData = new MouseEventData();
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
    KeyDownJSAPI4X(k: KeyboardEvent) {
        let kEventData: KeyboardEventData = this.CommonEventBuilder(k);
        this.app.keyEvent(kEventData);
    }
    CommonEventBuilder(k: KeyboardEvent): KeyboardEventData {
        let kEvent: KeyboardEventData = new KeyboardEventData();
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
export class MouseEventData {
    x: number = -1; y: number = -1; z: number = -1;
    preX: number = -1; preY: number = -1; preZ: number = -1;
    yGLPicking: number;
    isDown: boolean = false;
    isDoubleClick: boolean = false;
    isMove: boolean = false;
    pressedShift: boolean = false;
    pressedAlt: boolean = false;
    pressedCtrl: boolean = false;
    lat: number = -1;
    long: number = -1;
    wheel: number = 0;
    preWheel: number = 0;
    type: MOUSE_TYPE;
    native: MouseEvent;
    constructor() {
    }
    DeepCopy() {
        let mEvent = new MouseEventData();
        mEvent.x = this.x; mEvent.y = this.y; mEvent.z = this.z; mEvent.preX = this.preX; mEvent.preY = this.preY; mEvent.preZ = this.preZ;
        mEvent.pressedAlt = this.pressedAlt; mEvent.pressedShift = this.pressedShift; mEvent.pressedCtrl = this.pressedCtrl;
        mEvent.isDoubleClick = this.isDoubleClick; mEvent.isDown = this.isDown; mEvent.isMove = this.isMove;
        mEvent.lat = this.lat; mEvent.long = this.long; mEvent.wheel = this.wheel; mEvent.preWheel = this.preWheel;
        mEvent.yGLPicking = this.yGLPicking;
        mEvent.native = this.native;
        return mEvent;
    }
}
export class KeyboardEventData {
    preEvent: KeyboardEventData;
    key: string;
    hasAltKey: boolean;
    hasCtrlKey: boolean;
    hasShiftKey: boolean;
    hasMetaCommand: boolean;
    code: string;
    keyCode: number;
    constructor() {
        //
    }
}