import * as electron from "electron";
/**
 * Electron screen or remote screen
 * @returns {Electron.Screen}
 */
export const screen = () => {
    return electron.screen || electron.remote.screen;
};