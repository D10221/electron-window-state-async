/**
 * Optional WindowStateStore initializer
 */

import { createDebug } from "../create-debug";
import { Subscription } from "../types";

import { WindowStateStore } from "./window-state-store";
import { subscriber } from "./subscriber";

const debug = createDebug("init");
let started = false;
let subscription: Subscription;

/**
 * Initialize provided store, restore store's window, and remove listeners when window closing
 * @param store store to initialize
 * @returns a promise, resolves when restored and subscribed to window events
 */
export const start = (store: WindowStateStore) => new Promise((resolve, reject) => {
    if (started) {
        reject(new Error("Already Started"));
        return;
    }
    started = true;
    const win = store.window;
    try {
        debug("%s", "starting... ");
        win.once("ready-to-show", async () => {
            await store.restore();
            debug("%s", "subscribing: on ready-to-show");
            subscription = subscriber(store).subscribe(win);
            resolve();
        });

        win.once("close", (_e: Electron.Event) => {
            // TODO: what if close is cancelled ?
            debug("%s", "closing");
            subscription.unsubscribe();
        });

    } catch (e) {
        reject(e);
    }
});