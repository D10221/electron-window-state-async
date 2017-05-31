import { StateData } from "../types";
import { isWindowAlive } from "../is-window-alive";
import { createDebug } from "../create-debug";
import { screen } from "../screen";

function isNormal(win: Electron.BrowserWindow) {
    return !win.isMaximized() && !win.isMinimized() && !win.isFullScreen();
}

const debug = createDebug("update-state");

/**
 * @summary Mutate stored State
 */
export const updateState = (win: Electron.BrowserWindow, state: StateData) => {
    if (!isWindowAlive(win)) {
        return;
    }
    try {
        const winBounds = win.getBounds() as Electron.Rectangle;
        if (isNormal(win)) {
            state.bounds = state.bounds || {} as Electron.Rectangle;
            Object.assign(state.bounds, winBounds);
        }
        state.isMaximized = win.isMaximized();
        state.fullScreen = win.isFullScreen();
        state.displayBounds = screen().getDisplayMatching(winBounds).bounds;
        state.devToolsOpened = win.webContents.isDevToolsOpened();
        return ;
    } catch (err) {
        debug("%x", err.message);
        return ;
    }
};