import { Subscription, EventKey } from "./types";
import { isWindowAlive } from "./is-window-alive";
import { BrowserWindowLike } from "./index";
import { EventEmitter } from "events";

/**
 * Note: rx can replace this code
 */
export const subscriber = (observer: { next: (key: EventKey) => void }) => {

    const register = (emitter: EventEmitter, key: EventKey) => {
        const callback = () => observer.next(key);
        emitter.on(key, callback);
        return callback;
    };

    return {
        /**
         * Rx?
         */
        subscribe: (win: BrowserWindowLike): Subscription => {

            let unSubscribed = false;

            const onResize = register(win, "resize");
            const onMove = register(win, "move");
            const onDevtoolOpened = register(win.webContents, "devtools-opened");
            const onDevtoolClosed = register(win.webContents, "devtools-closed");

            return {
                /**
                 * @readonly
                 */
                isUnsubscribed: () => unSubscribed,

                /**
                 * terminate subscription,
                 * remove handlers
                 */
                unsubscribe: () => {
                    if (unSubscribed) {
                        throw new Error("Already Unsubsribed");
                    }
                    unSubscribed = true;
                    if (!isWindowAlive(win)) { throw new Error("window is not alive"); }
                    win.removeListener("resize", onResize);
                    win.removeListener("move", onMove);
                    win.webContents.removeListener("devtools-opened", onDevtoolOpened);
                    win.webContents.removeListener("devtools-closed", onDevtoolClosed);
                }
            };
        }
    };
};