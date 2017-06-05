"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const fs = require("fs");
const util_1 = require("util");
const store_path_1 = require("../storage/store-path");
describe("store Path", () => {
    it("works", () => {
        const value = store_path_1.storePath();
        assert.ok(fs.existsSync(value), `UserDataPath: ${value}\n\tDoesn't Exists`);
        assert.ok(fs.statSync(value).isDirectory(), "UserDataPath: is Not directory ");
        assert.ok(util_1.isString(process.env.WINDOW_STATE_HOME), "env.WINDOW_STATE_HOME not set");
    });
});
