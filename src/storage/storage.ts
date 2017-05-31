import { getStorageFilePath } from "./storage-file-path";
import { createDebug } from "../create-debug";
import { writeFile, readFile } from "fs";

const debug = createDebug("storage");

export const set = (storeKey: string, data: any) => {
    const _path = getStorageFilePath(storeKey);
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

export const get = (storeKey: string) => {
    const _path = getStorageFilePath(storeKey);
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

const outputJSON = (_path: string, data: any) => new Promise(
    (resolve, reject) => {
        try {
            writeFile(
                _path, JSON.stringify(data),
                error => {
                    if (error) {
                        reject(error);
                        return;
                    }
                    resolve();
                }
            );
        } catch (e) {
            reject(e);
        }
    }
);

const readJSON = (_path: string) => new Promise<any>(
    (resolve, reject) => {
        readFile(_path, "utf-8", (error, json) => {
            try {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(JSON.parse(json));
            } catch (e) {
                reject(e);
            }
        });
    }
);