import { app, BrowserWindow } from "electron";
import { render } from "./shell";
import { WindowStateStore, Subscription } from "../";

const utils = require("electron-json-storage/lib/utils");
console.log("user-data: " + utils.getUserDataPath());

const createWindow = () => {
    let win: Electron.BrowserWindow;
    win = new BrowserWindow({ show: false });
    console.log("window name: ", (win as any).name);

    let subscription: Subscription;
    const store = WindowStateStore(win);
    win.loadURL(render({
        title: "Electron window state store",
        scripts: ["window.js"]
    }));

    win.once("ready-to-show", async () => {
        console.log("ready-to-show");
        if (!win.isVisible()) {
            console.log("Showing");
            win.show();
        }
        if (!subscription) {
            await store.restore();
            console.log("subscribing: on ready-to-show");
            subscription = store.subscribe();
        }
    });

    win.on("close", (_e: Electron.Event) => {
        console.log("closing");
        // _e.preventDefault(); //will prevent close
        subscription.unsubscribe();
    });

    win.once("closed", () => {
        console.log("closed");
        win = null;
    });

    /**
     * WARNING: this one we emit from the store.
     */
    win.on("saved", () => {
        console.log("saved");
    });
    win.emit("saved");
};

app.on("ready", async () => {
    await createWindow();
});

app.on("window-all-closed", () => {
    console.log("quitting");
    app.quit();
});