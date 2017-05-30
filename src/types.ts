
import { EventEmitter } from "events";

/**
 * * Optional Electron.Rectangle implementation
 */
export interface RectangleLike {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
}

/**
 * Partial Electron.BrowserWindow.webContents implementation
 */
export interface WebContentsLike extends EventEmitter {
    isDevToolsOpened?: () => boolean;
    openDevTools?: () => void;
    closeDevTools?: () => void;
}

/**
 * Partial Electron.BrowserWindow implementation
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

export type EventKey = "resize" | "move" | "devtools-opened" | "devtools-closed" | "close" | "closed";

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