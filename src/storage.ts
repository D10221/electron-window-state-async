import { outputJSON, readJSON } from "fs-extra";
import { getStorageFilePath } from "./storage-file-path";
import { isDebug } from "./is-debug";
import { createDebug } from "./create-debug";
const debug = createDebug("storage");
export const set = (storeKey: string, data: any) => {
    const _path = getStorageFilePath(storeKey);
    return outputJSON(_path, data, { spaces: isDebug ? 2 : 0 });
};

export const get = (storeKey: string) => {
    const _path = getStorageFilePath(storeKey);
    return readJSON(_path)
        .then(x => {
            debug("%s", `wrote: ${_path}`);
            return x;
        })
        .catch(e => {
            debug("%e", e.message);
            return {};
        });
};