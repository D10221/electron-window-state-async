import { app, BrowserWindow } from "electron";
import { render } from "./shell";
import { WindowStateStore, Subscription } from "../";

const utils = require("electron-json-storage/lib/utils");
console.log("user-data: " + utils.getUserDataPath());
let win: Electron.BrowserWindow;
const createWindow = async () => {
    win = new BrowserWindow({ show: false });
    console.log("window name: ", (win as any).name);
    const store = WindowStateStore(win);
    await store.restore();

    win.loadURL(render({
        title: "Electron window state store",
        scripts: ["window.js"]
    }));

    let subscription: Subscription;
    win.once("ready-to-show", () => {
        console.log("ready-to-show");
        win.show();
        subscription = store.subscribe();
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
