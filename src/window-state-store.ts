import { isWindowAlive } from "./is-window-alive";
import { asyncStorage } from "electron-json-storage-async";
import { StateData, BrowserWindowLike, Subscription, EventKey } from "./types";
import { isNullOrUndefined as isNull } from "util";
import { subscriber } from "./subscriber";
import { createDebug } from "./create-debug";
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

    /**
     * Copy window State and Save to Store
     */
    const get = (): Promise<StateData> => {
        return asyncStorage.get(storeKey).catch(ex => {
            debug("Error: %x", ex.message);
            return {};
        });
    };

    const save = async () => {
        if (!isWindowAlive(win)) {
            return Promise.reject("Window not alive");
        }
        const state: StateData = await get();
        state.fullScreen = win.isFullScreen();
        if (!state.fullScreen) {
            state.bounds = win.getBounds();
        }
        state.devToolsOpened = win.webContents.isDevToolsOpened();
        await asyncStorage.set(storeKey, state);
        win.emit("saved");
        return Promise.resolve();
    };

    /**
     * restored from last saved
     */
    const restore = () => {
        return get().then(state => {
            const { bounds, devToolsOpened, fullScreen } = (
                state || { bounds: null, devToolsOpened: false, fullScreen: false }
            );
            if (!isNull(bounds) && !fullScreen) {
                win.setBounds(state.bounds);
            }
            if (fullScreen) {
                win.setFullScreen(fullScreen);
            }
            if (devToolsOpened) {
                win.webContents.openDevTools();
            }
        });
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