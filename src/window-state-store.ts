import { isWindowAlive } from "./is-window-alive";
// import { asyncStorage } from "electron-json-storage-async";
import { StateData, BrowserWindowLike, EventKey } from "./types";
import { createDebug } from "./create-debug";
import { hasBounds } from "./has-bounds";
import { updateState } from "./update-state";
import { validateBounds } from "./validate-bounds";
import { isValidState } from "./is-valid-state";
import * as storage from "./storage";

const debug = createDebug("store");
/**
 * Save/Restore window state
 * @param win {BrowserWindowLike}
 * @param onError {(e: Error) => callback} optional error callback
 */
export class WindowStateStore {
    load: () => Promise<StateData>;
    save: () => Promise<void>;
    restore: () => Promise<void>;
    clear: () => Promise<void>;
    constructor(private win: BrowserWindowLike) {

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
            return storage.set(storeKey, state);
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
        };

        /**
         * @summary clear current state
         */
        this.clear = () => {
            return storage.get(storeKey);
        };
    }
    getWindow = () => this.win as Electron.BrowserWindow; // TODO: remove ?BrowserWindowLike Dependency ?
    next = async (_key: EventKey) => {
        await this.save()
            .then(() => debug(`after-save: ${_key}`));
    }
}