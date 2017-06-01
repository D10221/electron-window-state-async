import * as electron from "electron";
import { join } from "path";
import { isNullOrUndefined as isNull } from "util";
import { sync as mkdirp } from "mkdirp";
import { createDebug } from "../create-debug";
const debug = createDebug("store-path");

const storeDirName: string = "window-state";

let _storePath: string;

/**
 *  lookups up env $WINDOW_STATE_HOME then electron's provided <userData> , once.
 */
export const storePath = () => {
    if (!isNull(_storePath)) {
        return _storePath;
    }
    const userDataHome = process.env.WINDOW_STATE_HOME || (electron.remote && electron.remote.app).getPath("userData");
    _storePath = join(userDataHome, storeDirName);
    mkdirp(_storePath);

    debug("WINDOW_STATE_HOME: %s", process.env.WINDOW_STATE_HOME || "?");
    debug("userDataHome: %s", userDataHome);
    debug(`storePath: ${_storePath}`);

    return _storePath;
};