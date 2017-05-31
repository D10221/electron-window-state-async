
import * as assert from "assert";
import * as fs from "fs";
import { isString } from "util";
import { storePath } from "../storage/store-path";

describe("store Path", () => {
    it("works", () => {
        const value = storePath();
        assert.ok(fs.existsSync(value), `UserDataPath: ${value}\n\tDoesn't Exists`);
        assert.ok(fs.statSync(value).isDirectory(), "UserDataPath: is Not directory ");
        assert.ok(isString(process.env.WINDOW_STATE_HOME), "env.WINDOW_STATE_HOME not set");
    });
});