import { StateData } from "../types";
import { hasBounds } from "./has-bounds";
/**
 * is valid state
 * @param state state to validate
 */
export const isValidState = (state: StateData): boolean =>
    state && (hasBounds(state) || state.isMaximized || state.fullScreen);