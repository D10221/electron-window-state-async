
import * as electron from "electron";
import { isNullOrUndefined as isNull } from "util";

const _cache: any = {};
export const getPathByName = (key: "userData") => {
    const value = Object.keys(_cache).find(x => x === key);
    if (!isNull(value)) {
        return value;
    }
    _cache[key] = (electron.app || (electron.remote && electron.remote.app)).getPath(key);
    return _cache[key];
};
