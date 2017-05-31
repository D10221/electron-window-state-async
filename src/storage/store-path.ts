import { userDataPath } from "../locations";
import { join } from "path";
import { isNullOrUndefined as isNull } from "util";
import { sync as mkdirp } from "mkdirp";

export const storeFolderName = "window-state-storage";
let _storePath: string;
export const storePath = () => {
    if (!isNull(_storePath)) {
        return _storePath;
    }
    _storePath = join(userDataPath(), storeFolderName);
    mkdirp(_storePath);
    return _storePath;
};