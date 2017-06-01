import * as path from "path";
import { storePath } from "./store-path";
import { isNullOrUndefined as isNull } from "util";

const _cache: any = {};
/**
 * return store path + @param key + store extension,
 * currently hardcoded as '.json'
 * @param key storage file name without extension
 */
export const getStorageFilePath = (key: string) => {
    const value = _cache[key];
    if (!isNull(value)) {
        return value;
    }
    _cache[key] = path.join(storePath(), `${key}.json`);
    return _cache[key];
};
