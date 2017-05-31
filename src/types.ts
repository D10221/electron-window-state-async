
/**
 * Persisted data shape
 */
export interface StateData {
    fullScreen?: boolean;
    devToolsOpened?: boolean;
    bounds?: Electron.Rectangle;
    isMaximized?: boolean;
    displayBounds?: Electron.Rectangle;
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