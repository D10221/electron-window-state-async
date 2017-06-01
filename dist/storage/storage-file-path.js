"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const store_path_1 = require("./store-path");
const util_1 = require("util");
const _cache = {};
exports.getStorageFilePath = (key) => {
    const value = _cache[key];
    if (!util_1.isNullOrUndefined(value)) {
        return value;
    }
    _cache[key] = path.join(store_path_1.storePath(), `${key}.json`);
    return _cache[key];
};
