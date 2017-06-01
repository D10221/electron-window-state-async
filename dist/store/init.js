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
const create_debug_1 = require("../create-debug");
const subscriber_1 = require("./subscriber");
const debug = create_debug_1.createDebug("init");
let started = [];
let subscription;
exports.start = (store) => new Promise((resolve, reject) => {
    const didStart = started.indexOf(store.window.id) !== -1;
    if (didStart) {
        reject(new Error(`window: ${store.window.id} already started`));
        return;
    }
    started.push(store.window.id);
    try {
        store.window.once("ready-to-show", () => __awaiter(this, void 0, void 0, function* () {
            yield store.restore();
            debug("%s", "subscribing: on ready-to-show");
            subscription = subscriber_1.subscriber(store).subscribe(store.window);
            resolve();
        }));
        store.window.once("close", (_e) => {
            debug("%s", "closing");
            subscription.unsubscribe();
            started = started.filter(id => id !== store.window.id);
        });
    }
    catch (e) {
        debug("%e", e.message);
        reject(e);
    }
});
