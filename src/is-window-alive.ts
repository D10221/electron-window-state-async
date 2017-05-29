import * as util from "util";
import { BrowserWindowLike } from "./types";
export type BrowserWindow = BrowserWindowLike;

/**
 * is window destroyed?/disposed/collected/null
 */
export const isWindowAlive = (window: BrowserWindowLike) => {
    return !util.isNullOrUndefined(window) && !window.isDestroyed();
};
