"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const debug = require("debug");
debug.formatters.x = (x) => `${x}`;
debug.formatters.e = (x) => `error: ${x}`;
debug.formatters.w = (x) => `warning: ${x}`;
exports.createDebug = (moduleKey) => {
    return debug(`window-state:${moduleKey}`);
};
