"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const screen_1 = require("../screen");
const deep_equal_1 = require("../deep-equal");
const has_bounds_1 = require("./has-bounds");
const is_valid_state_1 = require("./is-valid-state");
exports.validateBounds = (state) => {
    if (!is_valid_state_1.isValidState(state))
        return;
    if (!(has_bounds_1.hasBounds(state) && state.displayBounds))
        return;
    const displayBounds = screen_1.screen().getDisplayMatching(state.bounds).bounds;
    const sameBounds = deep_equal_1.deepEqual(state.displayBounds, displayBounds);
    if (sameBounds)
        return;
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
