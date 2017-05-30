import { isWindowAlive } from "./is-window-alive";
import { asyncStorage } from "electron-json-storage-async";
import { StateData, BrowserWindowLike, Subscription, EventKey } from "./types";
import { subscriber } from "./subscriber";
import { createDebug } from "./create-debug";
import { hasBounds } from "./has-bounds";
import { updateState } from "./update-state";
import { validate } from "./validate";

const debug = createDebug("store");
/**
 * Save/Restore window state
 * @param win {BrowserWindowLike}
 * @param onError {(e: Error) => callback} optional error callback
 */
export const WindowStateStore = (

    win: BrowserWindowLike,

    onError?: (e: Error) => void) => {

    const storeKey = `window_${win.id}`;

    onError = onError || ((e) => {
        debug("%x", e.message);
    });

    const get = (): Promise<StateData> => {
        return asyncStorage.get(storeKey).catch(ex => {
            debug("Error: %x", ex.message);
            return {};
        });
    };

    const save = async () => {
        if (!isWindowAlive(win)) {
            debug("%x", "Window not alive");
            return Promise.resolve();
        }
        // no neeed to save
        if (!updateState(win, state)) return Promise.resolve();
        if (!validate(state)) return Promise.resolve;

        await asyncStorage.set(storeKey, state);
        win.emit("saved");
        return Promise.resolve();
    };
    let state: StateData;

    /**
     * restored from last saved
     */
    const restore = async () => {

        state = (await get()) || {
            devToolsOpened: false,
            fullScreen: false,
            isMaximized: false
        };
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
    const clear = () => {
        return asyncStorage.set(storeKey, {});
    };

    /**
     * Note: rx can replace this
     */
    const observer = {
        next: async (_key: EventKey) => {
            await save();
        }
    };

    return {
        restore,
        save,
        clear,
        value: get,
        /**
         * subscribe to window events and save it's curent state
         * Note: rxjs can replace this
         */
        subscribe: () => {
            // TODO: await restore() ?; //StartWith?
            return subscriber(observer).subscribe(win) as Subscription;
        },
    };
};