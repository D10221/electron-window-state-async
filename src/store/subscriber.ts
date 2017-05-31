import { Subscription, EventKey, ObserverLike, Registration } from "../types";
import { isWindowAlive } from "../is-window-alive";
import { EventEmitter } from "events";
import { createDebug } from "../create-debug";
const debug = createDebug("subscriber");

/**
 * takes an Observer who's netx(key) will be invoked with the 'event'
 *  key used to register the 'event' callback on window & window.webContents.
 * Note: Not an Observable, creates a subscribing function that returns an unsubscriber
 * Note: rxjs could be used to replace this functionality
 */
export const subscriber = (observer: ObserverLike) => {

    /**
     * sort of relay:
     */
    const register = (emitter: EventEmitter, key: EventKey, throttle?: number) => {
        const skip: any = {};
        const callback = () => {
            // Throttle:
            if (throttle > 0) {
                if (skip[key]) return; // debug("Event: %s: skipped", key);
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
    let winSubscriptions: Registration[] = [];
    let webContentSubscriptions: Registration[] = [];

    return {
        /**
         * Rx?
         */
        subscribe: (win: Electron.BrowserWindow): Subscription => {

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
                // register(win, "closed")
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
                        x => (win as EventEmitter).removeListener(x.key, x.callback)
                    );
                    winSubscriptions = [];

                    webContentSubscriptions.forEach(
                        x => (win.webContents as EventEmitter).removeListener(x.key, x.callback)
                    );
                    webContentSubscriptions = [];
                }
            };
        }
    };
};