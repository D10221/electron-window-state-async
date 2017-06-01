"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const wait_event_1 = require("./wait-event");
const events_1 = require("events");
const delay_1 = require("./delay");
const util_1 = require("util");
describe("wait-event", () => {
    it("waits", () => __awaiter(this, void 0, void 0, function* () {
        const e = new events_1.EventEmitter();
        let ok = false;
        e.on("x-event", () => {
            ok = true;
        });
        delay_1.delay(10).then(() => {
            e.emit("x-event");
        });
        yield wait_event_1.waitEvent(e, "x-event", 15);
        assert.ok(ok);
    }));
    it("Throws", () => __awaiter(this, void 0, void 0, function* () {
        const e = new events_1.EventEmitter();
        const ex = yield wait_event_1.waitEvent(e, "x-event", 10)
            .then(_ => null)
            .catch(exx => exx);
        assert.ok(util_1.isError(ex));
        assert.equal(ex.message, "x-event timed out");
    }));
});
