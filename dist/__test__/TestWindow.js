"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events = require("events");
class TestWindow extends events.EventEmitter {
    constructor(o) {
        super();
        this.o = o;
        this.defaults = () => {
            this.o = {
                id: "main",
                bounds: { x: 1, y: 1, height: 1, width: 1 },
                isDevToolsOpened: false,
                isFullScreen: false,
                destroyed: false,
            };
            this.webContents = new TestWebContents(this.o);
            return;
        };
        this.isDestroyed = () => this.o.destroyed;
        this.destroy = () => this.o.destroyed = true;
        this.getBounds = () => this.o.bounds;
        this.setBounds = (b) => {
            Object.assign(this.o.bounds, b);
            this.emit("resize");
            this.emit("move");
        };
        this.isFullScreen = () => this.o.isFullScreen;
        this.setFullScreen = (x) => {
            this.o.isFullScreen = x;
            this.emit("resize");
            this.emit("move");
        };
        this.o = this.o || {};
        this.o.id = this.o.id || "main";
        this.o.bounds = this.o.bounds || { x: 1, y: 1, height: 1, width: 1 };
        this.o.isDevToolsOpened = this.o.isDevToolsOpened || false;
        this.o.isFullScreen = this.o.isFullScreen || false;
        this.o.destroyed = this.o.destroyed || false;
        this.webContents = new TestWebContents(this.o);
    }
    get id() {
        return this.o.id;
    }
    set id(value) {
        this.o.id = value;
    }
}
exports.TestWindow = TestWindow;
class TestWebContents extends events.EventEmitter {
    constructor(o) {
        super();
        this.o = o;
        this.isDevToolsOpened = () => this.o.isDevToolsOpened;
        this.openDevTools = () => {
            this.o.isDevToolsOpened = true;
            this.emit("devtools-opened");
        };
        this.closeDevTools = () => {
            this.o.isDevToolsOpened = false;
            this.emit("devtools-closed");
        };
    }
}
exports.TestWebContents = TestWebContents;
