import { StateData } from "./types";
import { hasBounds } from "./has-bounds";

export const isValidState = (state: StateData): boolean => {
    return state && (hasBounds(state) || state.isMaximized || state.fullScreen);
};