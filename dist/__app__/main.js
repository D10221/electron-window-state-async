"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const miniShell = require("mini-shell");
const store_1 = require("../store");
electron_1.app.on("ready", () => __awaiter(this, void 0, void 0, function* () {
    const win = new electron_1.BrowserWindow({ show: false });
    const store = new store_1.WindowStateStore(win);
    win.loadURL(miniShell.renderToFile({
        title: "Electron window state store",
        scripts: ["window.js"]
    }, "window", __dirname, "file"));
    yield store_1.start(store);
    win.show();
}));
electron_1.app.on("window-all-closed", () => {
    console.log("quitting");
    electron_1.app.quit();
});
