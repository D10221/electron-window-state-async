/// <reference types="node" />
import { BrowserWindowLike, RectangleLike, WebContentsLike } from "../types";
import events = require("events");
export interface TestWindowOptions {
    bounds?: RectangleLike;
    isDevToolsOpened?: boolean;
    isFullScreen?: boolean;
    destroyed?: boolean;
    id?: string;
}
export declare class TestWindow extends events.EventEmitter implements BrowserWindowLike {
    private o;
    defaults: () => void;
    constructor(o?: TestWindowOptions);
    id: any;
    isDestroyed: () => boolean;
    destroy: () => boolean;
    getBounds: () => RectangleLike;
    setBounds: (b: RectangleLike) => void;
    isFullScreen: () => boolean;
    setFullScreen: (x: boolean) => void;
    webContents: WebContentsLike;
}
export declare class TestWebContents extends events.EventEmitter implements WebContentsLike {
    private o;
    constructor(o?: TestWindowOptions);
    isDevToolsOpened: () => boolean;
    openDevTools: () => void;
    closeDevTools: () => void;
}
