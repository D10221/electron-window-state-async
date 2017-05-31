import { StateData } from "../types";
import { screen } from "../screen";
import { deepEqual } from "../deep-equal";

import { hasBounds } from "./has-bounds";
import { isValidState } from "./is-valid-state";

type Rectangle = Electron.Rectangle;

export const validateBounds = (state: StateData) => {
    if (!isValidState(state)) return;
    if (!(hasBounds(state) && state.displayBounds)) return;

    // Check if the display where the window was last open is still available
    const displayBounds = screen().getDisplayMatching(state.bounds as Rectangle).bounds;
    const sameBounds = deepEqual(state.displayBounds, displayBounds);

    if (sameBounds) return;

    if (displayBounds.width < state.displayBounds.width) {
        if (state.bounds.x > displayBounds.width) {
            state.bounds.x = 0;
        }

        if (state.bounds.width > displayBounds.width) {
            state.bounds.width = displayBounds.width;
        }
    }

    if (displayBounds.height < state.displayBounds.height) {
        if (state.bounds.y > displayBounds.height) {
            state.bounds.y = 0;
        }

        if (state.bounds.height > displayBounds.height) {
            state.bounds.height = displayBounds.height;
        }
    }
};
