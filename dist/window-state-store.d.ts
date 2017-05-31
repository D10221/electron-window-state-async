import { StateData, Subscription } from "./types";
export declare const WindowStateStore: (win: Electron.BrowserWindow, onError?: (e: Error) => void) => {
    restore: () => Promise<void>;
    save: () => Promise<void>;
    clear: () => Promise<void>;
    value: () => Promise<StateData>;
    subscribe: () => Subscription;
};
