/// <reference types="node" />
import { EventEmitter } from "events";
export declare const waitEvent: (e: EventEmitter, key: string, timeout: number) => Promise<{}>;
