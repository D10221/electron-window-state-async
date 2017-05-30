import { Subscription, EventKey, ObserverLike, Registration } from "./types";
import { isWindowAlive } from "./is-window-alive";
import { BrowserWindowLike } from "./index";
import { EventEmitter } from "events";
import { createDebug } from "./create-debug";
const debug = createDebug("subscriber");
/**
 * takes an Observer who's netx(key) will be invoked with the 'event'
 *  key used to register the 'event' callback on window & window.webContents.
 * Note: Not an Observable, creates a subscribing function that returns an unsubscriber
 * Note: rxjs could be used to replace this functionality
 */
export const subscriber = (observer: ObserverLike) => {

    const register = (emitter: EventEmitter, key: EventKey) => {
        const callback = () => {
            debug("Event: %x", key);
            observer.next(key);
        };
        emitter.on(key, callback);
        return {
            key,
            callback
        };
    };
    let winSubscriptions: Registration[] = [];
    let webContentSubscriptions: Registration[] = [];

    return {
        /**
         * Rx?
         */
        subscribe: (win: BrowserWindowLike): Subscription => {

            let unSubscribed = false;

            winSubscriptions.concat([
                register(win, "resize"),
                register(win, "move"),
                register(win, "close"),
                register(win, "closed")
            ]);

            webContentSubscriptions.concat([
                register(win.webContents, "devtools-opened"),
                register(win.webContents, "devtools-closed")
            ]);

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

                    // removeListener
                    winSubscriptions.forEach(
                        x => win.removeListener(x.key, x.callback)
                    );
                    winSubscriptions = [];

                    webContentSubscriptions.forEach(
                        x => win.webContents.removeListener(x.key, x.callback)
                    );
                    webContentSubscriptions = [];

                    // win.removeListener("resize", onResize);
                    // win.removeListener("move", onMove);
                    // win.webContents.removeListener("devtools-opened", onDevtoolOpened);
                    // win.webContents.removeListener("devtools-closed", onDevtoolClosed);
                }
            };
        }
    };
};