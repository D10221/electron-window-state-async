"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const has_bounds_1 = require("./has-bounds");
exports.isValidState = (state) => state && (has_bounds_1.hasBounds(state) || state.isMaximized || state.fullScreen);
