import { StateData, BrowserWindowLike, Subscription } from "./types";
export declare const WindowStateStore: (win: BrowserWindowLike, onError?: (e: Error) => void) => {
    restore: () => Promise<void>;
    save: () => Promise<void>;
    clear: () => Promise<void>;
    value: () => Promise<StateData>;
    subscribe: () => Subscription;
};
