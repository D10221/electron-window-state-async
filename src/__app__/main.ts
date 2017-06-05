import { app, BrowserWindow } from "electron";
import { WindowStateStore, start } from "../store";

app.on("ready", async () => {
    const win = new BrowserWindow({ show: false });
    const store = new WindowStateStore(win);
    win.loadURL( `file:///${__dirname}/window.html`);
    await start(store);
    win.show();
});

app.on("window-all-closed", () => {
    console.log("quitting");
    app.quit();
});