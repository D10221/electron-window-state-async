import * as electron from "electron";
/**
 * @returns {Electron.Screen}
 */
export const screen = () => {
    return electron.screen || electron.remote.screen;
};