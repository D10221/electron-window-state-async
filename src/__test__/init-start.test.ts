import * as assert from "assert";
import { isError } from "util";

import { BrowserWindow } from "electron";
import { WindowStateStore, start as startStore } from "../";

describe("init & start", () => {

    it("Can't be started twice with the same window", async () => {
        let error: Error;
        try {
            const store = new WindowStateStore(new BrowserWindow({ show: false }));
            setTimeout(() => store.window.emit("ready-to-show"), 10);
            await startStore(store);
            await startStore(store);
        } catch (ex) {
            error = ex;
        }
        assert.ok(isError(error));
        assert.ok(/window:\s+\d+\s+already\s+started/.test(error.message));
    });

    it("Can be started with another window", async () => {

        const store1 = new WindowStateStore(new BrowserWindow({ show: false }));
        setTimeout(() => store1.window.emit("ready-to-show"), 10);
        await startStore(store1);

        const store2 = new WindowStateStore(new BrowserWindow({ show: false }));
        setTimeout(() => store2.window.emit("ready-to-show"), 10);
        await startStore(store2);
    });
});