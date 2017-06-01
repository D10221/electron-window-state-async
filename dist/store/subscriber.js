"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const is_window_alive_1 = require("../is-window-alive");
const create_debug_1 = require("../create-debug");
const debug = create_debug_1.createDebug("subscriber");
exports.subscriber = (observer) => {
    const register = (emitter, key, throttle) => {
        const skip = {};
        const callback = () => {
            if (throttle > 0) {
                if (skip[key])
                    return;
                skip[key] = true;
                setTimeout(() => { skip[key] = false; }, throttle);
            }
            debug("Event: %x", key);
            observer.next(key);
        };
        emitter.on(key, callback);
        return {
            key,
            callback
        };
    };
    let winSubscriptions = [];
    let webContentSubscriptions = [];
    return {
        subscribe: (win) => {
            let unSubscribed = false;
            winSubscriptions.concat([
                register(win, "resize", 100),
                register(win, "move", 100),
                register(win, "maximize"),
                register(win, "unmaximize"),
                register(win, "minimize"),
                register(win, "restore"),
                register(win, "enter-full-screen"),
                register(win, "leave-full-screen"),
                register(win, "close"),
            ]);
            webContentSubscriptions.concat([
                register(win.webContents, "devtools-opened"),
                register(win.webContents, "devtools-closed")
            ]);
            return {
                isUnsubscribed: () => unSubscribed,
                unsubscribe: () => {
                    if (unSubscribed) {
                        throw new Error("Already Unsubsribed");
                    }
                    unSubscribed = true;
                    if (!is_window_alive_1.isWindowAlive(win)) {
                        throw new Error("window is not alive");
                    }
                    winSubscriptions.forEach(x => win.removeListener(x.key, x.callback));
                    winSubscriptions = [];
                    webContentSubscriptions.forEach(x => win.webContents.removeListener(x.key, x.callback));
                    webContentSubscriptions = [];
                }
            };
        }
    };
};
