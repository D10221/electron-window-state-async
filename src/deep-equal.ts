import { deepEqual as _deepEqual} from "assert";
import { isNullOrUndefined as isNull } from "util";
/**
 * TODO: optimize or use something else
 */
export const deepEqual = (a: any, b: any): boolean => {
    if (isNull(a)) return a === b;
    try {
        _deepEqual(a, b);
        return true;
    } catch (_e) {
        return false;
    }
};