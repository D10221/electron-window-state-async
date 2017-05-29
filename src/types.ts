
import { EventEmitter } from "events";

export interface RectangleLike {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
}

export interface WebContentsLike extends EventEmitter {
    isDevToolsOpened: () => boolean;
    openDevTools?: () => void;
    closeDevTools?: () => void;
}
export interface BrowserWindowLike extends EventEmitter {
    id?: any;
    isFullScreen?: () => boolean;
    setFullScreen?: (x: boolean) => void;
    getBounds?: () => RectangleLike;
    setBounds?: (x: RectangleLike) => void;
    webContents?: WebContentsLike;
    isDestroyed?: () => boolean;
    destroy?: () => void;
}
export interface StateData {
    fullScreen: boolean;
    devToolsOpened: boolean;
    bounds: RectangleLike;
}

/**
 * rx can replace this
 */
export interface Subscription {
    isUnsubscribed(): boolean;
    unsubscribe(): void;
}

export type EventKey = "resize" | "move" | "devtools-opened" | "devtools-closed";