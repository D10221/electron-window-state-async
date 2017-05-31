import { StateData } from "../types";
import { isNullOrUndefined as isNull } from "util";

export const hasBounds = (state: StateData) => {
    return !isNull(state) && !isNull(state.bounds) &&
        Number.isInteger(state.bounds.x) &&
        Number.isInteger(state.bounds.y) &&
        Number.isInteger(state.bounds.width) && state.bounds.width > 0 &&
        Number.isInteger(state.bounds.height) && state.bounds.height > 0;
};