import { EventEmitter } from "events";

// .. up
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
 * Save, restore, manage, window state
 * @param win {Electron.BrowserWindow}
 */
export class WindowStateStore extends EventEmitter {

    /**
     * get currently stored state
     */
    getState: () => Promise<StateData>;

    /**
     * saves window state
     */
    save: () => Promise<void>;

    /**
     * sets window values from stored state
     */
    restore: () => Promise<void>;

    /**
     * set stored state to empty
     */
    clear: () => Promise<void>;

    constructor(private win: Electron.BrowserWindow) {
        super();

        const storeKey = `window_${win.id}`;

        this.getState = (): Promise<StateData> => {
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
            // collect window data
            updateState(win, state);
            // correct bounds
            validateBounds(state);

            // persist
            if (!isValidState(state)) return;
            const me = this;
            return storage.set(storeKey, state)
                .then(_ => me.emit("saved"));
        };

        /**
         * restored from last saved
         */
        this.restore = async () => {
            const state = (await this.getState());
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
            return storage.set(storeKey, {})
                .then(_ => {
                    me.emit("cleared");
                });
        };
    }
    /**
     * gets the window
     */
    get window() {
        return this.win as Electron.BrowserWindow;
    }
    /**
     * ObserverLike interface Implementation
     */
    next = async (_key: EventKey) => {
        await this.save()
            .then(() => debug(`after-save: ${_key}`));
    }
}