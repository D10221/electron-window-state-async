"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("util");
exports.hasBounds = (state) => {
    return !util_1.isNullOrUndefined(state) && !util_1.isNullOrUndefined(state.bounds) &&
        Number.isInteger(state.bounds.x) &&
        Number.isInteger(state.bounds.y) &&
        Number.isInteger(state.bounds.width) && state.bounds.width > 0 &&
        Number.isInteger(state.bounds.height) && state.bounds.height > 0;
};
