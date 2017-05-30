import { EventEmitter } from "events";

/**
 * Test Support promify EventEmitter, with timeOut
 */
export const waitEvent = (e: EventEmitter, key: string, timeout: number) => new Promise(
    (resolve, reject) => {
        let resolved = false;
        e.once(key, () => {
            resolve();
            resolved = true;
        });
        setTimeout(() => {
            if (!resolved) reject(new Error(`${key} timed out`));
        }, timeout);
    }
);
