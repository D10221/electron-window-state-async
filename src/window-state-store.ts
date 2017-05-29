import { isWindowAlive } from "./is-window-alive";
import { AsyncStore } from "electron-json-storage-async";
import { StateData, BrowserWindowLike, Subscription, EventKey } from "./types";
import { isNullOrUndefined as isNull } from "util";
import { subscriber } from "./subscriber";

export const WindowStateStore = (

    win: BrowserWindowLike,

    onError?: (e: Error) => void) => {

    const storeKey = `window_${win.id}`;

    const storage = AsyncStore<any>(storeKey);

    onError = onError || ((e) => {
        console.error(e);
    });

    /**
     * Copy window State and Save to Store
     */
    const get = (): Promise<StateData> => {
        return storage.get(storeKey);
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
        await storage.set(storeKey, state);
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
     * @summary clear values, TODO: to defaults?
     */
    const clear = () => {
        return storage.set(storeKey, {});
    };

    /**
     * rx can replace this
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
         * rx can replace this
         */
        subscribe: () => {
            // TODO: await restore() ?; //StartWith?
            return subscriber(observer).subscribe(win) as Subscription;
        },
    };
};