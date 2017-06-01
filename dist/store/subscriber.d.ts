import { Subscription, ObserverLike } from "../types";
export declare const subscriber: (observer: ObserverLike) => {
    subscribe: (win: Electron.BrowserWindow) => Subscription;
};
