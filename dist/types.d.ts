export interface StateData {
    fullScreen?: boolean;
    devToolsOpened?: boolean;
    bounds?: Electron.Rectangle;
    isMaximized?: boolean;
    displayBounds?: Electron.Rectangle;
}
export interface Subscription {
    isUnsubscribed(): boolean;
    unsubscribe(): void;
}
export declare type EventKey = "resize" | "move" | "devtools-opened" | "devtools-closed" | "close" | "closed" | "maximize" | "unmaximize" | "minimize" | "restore" | "enter-full-screen" | "leave-full-screen";
export interface ObserverLike {
    next: (key: EventKey) => void;
}
export interface Registration {
    callback: () => void;
    key: string;
}
export interface SubscriberOptions {
    throttle?: number;
}
