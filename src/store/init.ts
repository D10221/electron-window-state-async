/**
 * Optional WindowStateStore initializer
 */

import { createDebug } from "../create-debug";
import { Subscription } from "../types";

import { WindowStateStore } from "./window-state-store";
import { subscriber } from "./subscriber";

const debug = createDebug("init");
let started: number[] = [];
let subscription: Subscription;

/**
 * Initialize provided store, restore store's window,
 *  subscribe to store window events,
 *  and remove listeners when window closing.
 *  Prevents starting twice same window;
 * @param store store to initialize
 * @returns a promise, resolves when store's window is restored and subscribed.
 */
export const start = (store: WindowStateStore) => new Promise((resolve, reject) => {
    // dont start twice
    const didStart = started.indexOf(store.window.id) !== -1;
    if (didStart) {
        reject(new Error(`window: ${store.window.id} already started`));
        return;
    }
    started.push(store.window.id);
    // ...
    try {
        store.window.once("ready-to-show", async () => {
            await store.restore();
            debug("%s", "subscribing: on ready-to-show");
            subscription = subscriber(store).subscribe(store.window);
            resolve();
        });

        store.window.once("close", (_e: Electron.Event) => {
            // TODO: what if close is cancelled ?
            debug("%s", "closing");
            subscription.unsubscribe();
            started = started.filter(id => id !== store.window.id);
        });

    } catch (e) {
        debug("%e", e.message);
        reject(e);
    }
});