import { Subscription, ObserverLike } from "./types";
import { BrowserWindowLike } from "./index";
export declare const subscriber: (observer: ObserverLike) => {
    subscribe: (win: BrowserWindowLike) => Subscription;
};
