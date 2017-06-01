import { app, BrowserWindow } from "electron";
import * as miniShell from "mini-shell";
import { WindowStateStore, start } from "../store";

app.on("ready", async () => {
    const win = new BrowserWindow({ show: false });
    const store = new WindowStateStore(win);
    win.loadURL( miniShell.renderToFile(
        {
            title: "Electron window state store",
            scripts: ["window.js"]
        }, // Model
            "window", // fileName
            __dirname, // :outDir
            "file"
        ));
    await start(store);
    win.show();
});

app.on("window-all-closed", () => {
    console.log("quitting");
    app.quit();
});