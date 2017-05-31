import * as path from "path";
import { getPathByName } from "./app-path";

let _userDataPath: string;
export const userDataPath = () => _userDataPath || (_userDataPath = path.join(getPathByName("userData")));
