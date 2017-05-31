
import { EventEmitter } from "events";

/**
 * * Optional Electron.Rectangle interface
 */
export interface RectangleLike {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
}

/**
 * Partial Electron.BrowserWindow.webContents interface
 */
export interface WebContentsLike extends EventEmitter {
    isDevToolsOpened?: () => boolean;
    openDevTools?: () => void;
    closeDevTools?: () => void;
}

/**
 * Partial Electron.BrowserWindow interface
 */
export interface BrowserWindowLike extends EventEmitter {
    id?: any;
    isMaximized?: () => boolean;
    isFullScreen?: () => boolean;
    setFullScreen?: (x: boolean) => void;
    getBounds?: () => RectangleLike;
    setBounds?: (x: RectangleLike) => void;
    webContents?: WebContentsLike;
    isDestroyed?: () => boolean;
    destroy?: () => void;
    isMinimized?: () => boolean;
    maximize?: () => void;
    show?: () => void;
    isVisible?: () => boolean;
}

/**
 * Persisted data shape
 */
export interface StateData {
    fullScreen?: boolean;
    devToolsOpened?: boolean;
    bounds?: RectangleLike;
    isMaximized?: boolean;
    displayBounds?: RectangleLike;
}

/**
 * used to remove listeners
 * Note: rxjs could replace this
 */
export interface Subscription {
    isUnsubscribed(): boolean;
    unsubscribe(): void;
}

export type EventKey =
    "resize" |
    "move" |
    "devtools-opened" |
    "devtools-closed" |
    "close" |
    "closed" |
    "maximize"|
    "unmaximize"|
    "minimize"|
    "restore"|
    "enter-full-screen"|
    "leave-full-screen";

/**
 * minimal event key observer
 */
export interface ObserverLike {
    next: (key: EventKey) => void;
}

/**
 * unsubscriber shape
 */
export interface Registration {
    callback: () => void;
    key: string;
}

/**
 * Subscriber options
 */
export interface SubscriberOptions {
    /**
     * number in milliseconds to throttle, events of the same key
     * @default 1000 milliseconds
     */
    throttle?: number;
}