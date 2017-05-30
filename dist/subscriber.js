"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const is_window_alive_1 = require("./is-window-alive");
exports.subscriber = (observer) => {
    const register = (emitter, key) => {
        const callback = () => observer.next(key);
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
            winSubscriptions.push(register(win, "resize"));
            winSubscriptions.push(register(win, "move"));
            webContentSubscriptions.push(register(win.webContents, "devtools-opened"));
            webContentSubscriptions.push(register(win.webContents, "devtools-closed"));
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
