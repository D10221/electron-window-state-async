import { userDataPath } from "../locations";
import * as assert from "assert";
import * as fs from "fs";

describe("userDataPath", () => {
    it("works", () => {
        assert.ok(fs.existsSync(userDataPath()));
    });
});