
import * as electron from "electron";
import { isNullOrUndefined as isNull } from "util";

const app = () => {
    return electron.app || (electron.remote && electron.remote.app);
};

const _cache: any = {};
export const getPathByName = (key: "userData") => {
    if (!isNull(_cache[key])) {
        return _cache[key];
    }
    _cache[key] = app().getPath(key);
    return _cache[key];
};
