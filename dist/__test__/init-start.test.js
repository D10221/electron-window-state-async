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
const util_1 = require("util");
const electron_1 = require("electron");
const _1 = require("../");
describe("init & start", () => {
    it("Can't be started twice with the same window", () => __awaiter(this, void 0, void 0, function* () {
        let error;
        try {
            const store = new _1.WindowStateStore(new electron_1.BrowserWindow({ show: false }));
            setTimeout(() => store.window.emit("ready-to-show"), 10);
            yield _1.start(store);
            yield _1.start(store);
        }
        catch (ex) {
            error = ex;
        }
        assert.ok(util_1.isError(error));
        assert.ok(/window:\s+\d+\s+already\s+started/.test(error.message));
    }));
    it("Can be started with another window", () => __awaiter(this, void 0, void 0, function* () {
        const store1 = new _1.WindowStateStore(new electron_1.BrowserWindow({ show: false }));
        setTimeout(() => store1.window.emit("ready-to-show"), 10);
        yield _1.start(store1);
        const store2 = new _1.WindowStateStore(new electron_1.BrowserWindow({ show: false }));
        setTimeout(() => store2.window.emit("ready-to-show"), 10);
        yield _1.start(store2);
    }));
});
