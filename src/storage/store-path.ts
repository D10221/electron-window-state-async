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
    const app = (electron.app || electron.remote.app);
    const userDataHome = process.env.WINDOW_STATE_HOME || app.getPath("userData");
    _storePath = join(userDataHome, storeDirName);

    debug("WINDOW_STATE_HOME: %s", process.env.WINDOW_STATE_HOME || "N/A");
    debug("userDataHome: %s", userDataHome);
    debug(`storePath: ${_storePath}`);

    mkdirp(_storePath);

    return _storePath;
};