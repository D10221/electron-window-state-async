/// <reference types="node" />
import { EventEmitter } from "events";
import { StateData, EventKey } from "../types";
export declare class WindowStateStore extends EventEmitter {
    private win;
    getState: () => Promise<StateData>;
    save: () => Promise<void>;
    restore: () => Promise<void>;
    clear: () => Promise<void>;
    constructor(win: Electron.BrowserWindow);
    readonly window: Electron.BrowserWindow;
    next: (_key: EventKey) => Promise<void>;
}
