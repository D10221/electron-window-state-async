"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const is_window_alive_1 = require("../is-window-alive");
const create_debug_1 = require("../create-debug");
const screen_1 = require("../screen");
function isNormal(win) {
    return !win.isMaximized() && !win.isMinimized() && !win.isFullScreen();
}
const debug = create_debug_1.createDebug("update-state");
exports.updateState = (win, state) => {
    if (!is_window_alive_1.isWindowAlive(win)) {
        return;
    }
    try {
        const winBounds = win.getBounds();
        if (isNormal(win)) {
            state.bounds = state.bounds || {};
            Object.assign(state.bounds, winBounds);
        }
        state.isMaximized = win.isMaximized();
        state.fullScreen = win.isFullScreen();
        state.displayBounds = screen_1.screen().getDisplayMatching(winBounds).bounds;
        state.devToolsOpened = win.webContents.isDevToolsOpened();
        return;
    }
    catch (err) {
        debug("%x", err.message);
        return;
    }
};
