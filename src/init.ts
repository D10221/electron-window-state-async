import { createDebug } from "./create-debug";
import { WindowStateStore } from "./window-state-store";
import { Subscription } from "./types";
import { subscriber } from "./subscriber";

const debug = createDebug("init");
let started = false;
let subscription: Subscription;

export const start = (store: WindowStateStore) => new Promise((resolve, reject) => {
    if (started) {
        reject(new Error("Already Started"));
        return;
    }
    started = true;
    const win = store.getWindow();
    try {
        debug("%s", "starting... ");
        win.once("ready-to-show", async () => {
            await store.restore();
            debug("%s", "subscribing: on ready-to-show");
            subscription = subscriber(store).subscribe(win);
            resolve();
        });
        win.once("close", (_e: Electron.Event) => {
            debug("%s", "closing");
            subscription.unsubscribe();
        });

    } catch (e) {
        reject(e);
    }
});