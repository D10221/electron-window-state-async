"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util = require("util");
exports.isWindowAlive = (window) => {
    return !util.isNullOrUndefined(window) && !window.isDestroyed();
};
