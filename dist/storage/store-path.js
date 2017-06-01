"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron = require("electron");
const path_1 = require("path");
const util_1 = require("util");
const mkdirp_1 = require("mkdirp");
const create_debug_1 = require("../create-debug");
const debug = create_debug_1.createDebug("store-path");
const storeDirName = "window-state";
let _storePath;
exports.storePath = () => {
    if (!util_1.isNullOrUndefined(_storePath)) {
        return _storePath;
    }
    const app = (electron.app || electron.remote.app);
    const userDataHome = process.env.WINDOW_STATE_HOME || app.getPath("userData");
    _storePath = path_1.join(userDataHome, storeDirName);
    debug("WINDOW_STATE_HOME: %s", process.env.WINDOW_STATE_HOME || "N/A");
    debug("userDataHome: %s", userDataHome);
    debug(`storePath: ${_storePath}`);
    mkdirp_1.sync(_storePath);
    return _storePath;
};
