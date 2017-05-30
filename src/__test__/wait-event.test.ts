import * as assert from "assert";
import { waitEvent } from "./wait-event";
import { EventEmitter } from "events";
import { delay } from "./delay";
import { isError } from "util";

describe("wait-event", () => {
    it("waits", async () => {
        const e = new EventEmitter();
        let ok = false;
        e.on("x-event", () => {
            ok = true;
        });
        delay(10).then(() => {
            e.emit("x-event");
        });
        await waitEvent(e, "x-event", 15);
        assert.ok(ok);
    });

    it("Throws", async () => {
        const e = new EventEmitter();
        const ex = await waitEvent(e, "x-event", 10)
            .then(_ => null)
            .catch(exx => exx);
        assert.ok(isError(ex));
        assert.equal(ex.message, "x-event timed out");
    });
});