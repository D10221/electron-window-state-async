import { userDataPath } from "../locations";
import * as assert from "assert";
import * as fs from "fs";

describe("userDataPath", () => {
    it("works", () => {
        const value = userDataPath();
        assert.ok(fs.existsSync(value), `UserDataPath: ${value}\n\tDoesn't Exists`);
        assert.ok(fs.statSync(value).isDirectory(), "UserDataPath: is Not directory ");
    });
});