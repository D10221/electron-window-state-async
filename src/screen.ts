import { isNullOrUndefined as isNull } from "util";

let _screen: Electron.Screen;
export const screen = () => {
    if (!isNull(_screen)) return _screen;
    const electron = require("electron");
    _screen = electron.screen || electron.remote.screen;
    return _screen;
};