import { Subscription, ObserverLike } from "./types";
import { Electron.BrowserWindow } from "./index";
export declare const subscriber: (observer: ObserverLike) => {
    subscribe: (win: Electron.BrowserWindow) => Subscription;
};
