import * as util from "util";

/**
 * is window destroyed?/disposed/collected/null
 */
export const isWindowAlive = (window: Electron.BrowserWindow) => {
    return !util.isNullOrUndefined(window) && !window.isDestroyed();
};
