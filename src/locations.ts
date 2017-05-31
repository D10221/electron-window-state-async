import * as path from "path";
import { getPathByName } from "./app-path";
export const storeFolderName = "window-state-storage";

let _userDataPath: string;
export const userDataPath = () => _userDataPath || (_userDataPath = path.join(getPathByName("userData")));

let _storePath: string;
export const storePath = () => _storePath || ( _storePath = path.join(userDataPath(), storeFolderName));