import { app, BrowserWindow } from "electron";
import { render } from "./shell";
import { WindowStateStore } from "../";
import { start } from "../init";
import { userDataPath } from "../locations";

console.log("user-data: " + userDataPath());

app.on("ready", async () => {
    const win = new BrowserWindow({ show: false });
    const store = new WindowStateStore(win);
    win.loadURL(render({
        title: "Electron window state store",
        scripts: ["window.js"]
    }));
    await start(store);
    win.show();
});

app.on("window-all-closed", () => {
    console.log("quitting");
    app.quit();
});