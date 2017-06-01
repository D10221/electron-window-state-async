"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.waitEvent = (e, key, timeout) => new Promise((resolve, reject) => {
    let resolved = false;
    e.once(key, () => {
        resolve();
        resolved = true;
    });
    setTimeout(() => {
        if (!resolved)
            reject(new Error(`${key} timed out`));
    }, timeout);
});
