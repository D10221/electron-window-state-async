
import { BrowserWindowLike, RectangleLike, WebContentsLike } from "../types";
import events = require("events");

/**
 * Options for TestWindow, override default values
 */
export interface TestWindowOptions {
    bounds?: RectangleLike;
    isDevToolsOpened?: boolean;
    isFullScreen?: boolean;
    destroyed?: boolean;

    id?: string;
}

/**
 * @summery Silly hand made mock
 */
export class TestWindow extends events.EventEmitter implements BrowserWindowLike {
    defaults = () => {
        this.o = {
            id: "main",
            bounds: { x: 1, y: 1, height: 1, width: 1 },
            isDevToolsOpened: false,
            isFullScreen: false,
            destroyed: false,
        };
        this.webContents = new TestWebContents(this.o);
        return;
    }

    constructor(
        private o?: TestWindowOptions
    ) {
        super();
        this.o = this.o || {};
        this.o.id = this.o.id || "main";
        this.o.bounds = this.o.bounds || { x: 1, y: 1, height: 1, width: 1 };
        this.o.isDevToolsOpened = this.o.isDevToolsOpened || false;
        this.o.isFullScreen = this.o.isFullScreen || false;
        this.o.destroyed = this.o.destroyed || false;
        this.webContents = new TestWebContents(this.o);
    }
    get id() {
        return this.o.id;
    }
    set id(value: any) {
        this.o.id = value;
    }
    isDestroyed = () => this.o.destroyed;
    destroy = () => this.o.destroyed = true;
    getBounds = () => this.o.bounds;
    setBounds = (b: RectangleLike) => {
        Object.assign(this.o.bounds, b);
        this.emit("resize");
        this.emit("move");
    }
    isFullScreen = () => this.o.isFullScreen;
    setFullScreen = (x: boolean) => {
        this.o.isFullScreen = x;
        this.emit("resize");
        this.emit("move");
    }
    webContents: WebContentsLike;
}



/**
 * TestWindow WebContents hand made mock
 */
// tslint:disable-next-line:max-classes-per-file
export class TestWebContents extends events.EventEmitter implements WebContentsLike {
    constructor(private o?: TestWindowOptions) {
        super();
    }
    isDevToolsOpened = () => this.o.isDevToolsOpened;
    openDevTools = () => {
        this.o.isDevToolsOpened = true;
        this.emit("devtools-opened");
    }
    closeDevTools = () => {
        this.o.isDevToolsOpened = false;
        this.emit("devtools-closed");
    }
}
