"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron = require("electron");
exports.screen = () => {
    return electron.screen || electron.remote.screen;
};
