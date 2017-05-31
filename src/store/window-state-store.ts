import { EventEmitter } from "events";

// ..
import { isWindowAlive } from "../is-window-alive";
import { StateData, EventKey } from "../types";
import { createDebug } from "../create-debug";
import { storage } from "../storage";

// ... this submodule
import { hasBounds } from "./has-bounds";
import { updateState } from "./update-state";
import { validateBounds } from "./validate-bounds";
import { isValidState } from "./is-valid-state";

const debug = createDebug("store");
/**
 * Save/Restore window state
 * @param win {Electron.BrowserWindow}
 * @param onError {(e: Error) => callback} optional error callback
 */
export class WindowStateStore extends EventEmitter {
    load: () => Promise<StateData>;
    save: () => Promise<void>;
    restore: () => Promise<void>;
    clear: () => Promise<void>;
    constructor(private win: Electron.BrowserWindow) {
        super();

        const storeKey = `window_${win.id}`;

        this.load = (): Promise<StateData> => {
            return storage.get(storeKey)
                .catch(e => {
                    debug("%e", e.message);
                    return {};
                });
        };
        this.save = async () => {

            if (!isWindowAlive(win)) {
                debug("%x", "Window not alive");
                return Promise.resolve();
            }

            const state = {};
            updateState(win, state);
            validateBounds(state);
            if (!isValidState(state)) return;

            const me = this;
            return storage.set(storeKey, state)
                .then(_ => me.emit("saved"));
        };
        // let state: StateData;

        /**
         * restored from last saved
         */
        this.restore = async () => {
            const state = (await this.load());
            const { devToolsOpened, fullScreen, isMaximized } = state;

            if (hasBounds(state)) {
                win.setBounds(state.bounds);
            }
            if (isMaximized) {
                win.maximize();
            }
            if (fullScreen) {
                win.setFullScreen(fullScreen);
            }
            if (devToolsOpened) {
                win.webContents.openDevTools();
            }
            this.emit("restored");
        };

        /**
         * @summary clear current state
         */
        this.clear = () => {
            const me = this;
            return storage.get(storeKey)
                .then(_ => {
                    me.emit("cleared");
                });
        };
    }
    get window() {
        return this.win as Electron.BrowserWindow;
    }
    next = async (_key: EventKey) => {
        await this.save()
            .then(() => debug(`after-save: ${_key}`));
    }
}