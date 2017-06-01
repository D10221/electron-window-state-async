"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const storage_file_path_1 = require("./storage-file-path");
const create_debug_1 = require("../create-debug");
const fs_1 = require("fs");
const debug = create_debug_1.createDebug("storage");
exports.set = (storeKey, data) => {
    const _path = storage_file_path_1.getStorageFilePath(storeKey);
    return outputJSON(_path, data)
        .then(x => {
        debug("%s", `set: ${_path}`);
        return x;
    })
        .catch(e => {
        debug("set: %e", e.message);
        return {};
    });
};
exports.get = (storeKey) => {
    const _path = storage_file_path_1.getStorageFilePath(storeKey);
    return readJSON(_path)
        .then(x => {
        debug("%s", `get: ${_path}`);
        return x;
    })
        .catch(e => {
        debug("get: %e", e.message);
        return {};
    });
};
const outputJSON = (_path, data) => new Promise((resolve, reject) => {
    try {
        fs_1.writeFile(_path, JSON.stringify(data), error => {
            if (error) {
                reject(error);
                return;
            }
            resolve();
        });
    }
    catch (e) {
        reject(e);
    }
});
const readJSON = (_path) => new Promise((resolve, reject) => {
    fs_1.readFile(_path, "utf-8", (error, json) => {
        try {
            if (error) {
                reject(error);
                return;
            }
            resolve(JSON.parse(json));
        }
        catch (e) {
            reject(e);
        }
    });
});
