import { app, BrowserWindow } from "electron";
import { render } from "./shell";
import { WindowStateStore } from "../";

const utils = require("electron-json-storage/lib/utils");
console.log("user-data: " + utils.getUserDataPath());

app.on("ready", async () => {

    const store = WindowStateStore(new BrowserWindow({ show: false }));
    const win = store.getWindow();

    win.loadURL(render({
        title: "Electron window state store",
        scripts: ["window.js"]
    }));
    /**
     * WARNING: this one we emit from the store.
     */
    win.on("saved", () => {
        console.log("saved");
    });

    await store.start();

    if (!win.isVisible()) {
        console.log("Showing");
        win.show();
    } else {
        console.log("Already visible?");
    }
});

app.on("window-all-closed", () => {
    console.log("quitting");
    app.quit();
});