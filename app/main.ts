import { app, BrowserWindow } from "electron";
import { render } from "./shell";

let win: Electron.BrowserWindow;

const createWindow = () => {
    win = new BrowserWindow({ show: false });
    win.loadURL(render({
        title: "Electron window state store",
        scripts: ["window.js"]
    }));
    win.once("ready-to-show", () => {
        console.log("ready-to-show");
        win.show();
    });
    win.once("closed", () => {
        console.log("closed");
        win = null;
    });
};

app.on("ready", () => {
    createWindow();
});

app.on("window-all-closed", () => {
    console.log("quitting");
    app.quit();
});
