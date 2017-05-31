import * as path from "path";
import { storePath } from "./store-path";
import { isNullOrUndefined as isNull } from "util";

const _cache: any = {};
export const getStorageFilePath = (key: string) => {
    const value = _cache[key];
    if (!isNull(value)) {
        return value;
    }
    _cache[key] = path.join(storePath(), `${key}.json`);
    const xxx = _cache[key];
    return xxx;
};
