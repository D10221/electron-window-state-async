#!/usr/bin/env node

/**
 * test launcher
 * export WINDOW_STATE_HOME=$HOME/tmp
 */

const fs = require("fs");
const path = require("path");
// const isNull = require("util").isNullOrUndefined;

const getFlag = (key) => {
    const args = process.argv.slice(2);
    const i = args.indexOf(key);
    return (i === -1) ? false : args[i + 1];
};

const home = getFlag("--home") || process.env.WINDOW_STATE_HOME;
if (!home) {
    console.error("$WINDOW_STATE_HOME not set")
    process.exit(-1);
}
if (!fs.existsSync(path.resolve(home))) {
    console.error(`$WINDOW_STATE_HOME=${home} doesn't exists`)
    process.exit(-1);
}
if (!fs.statSync(path.resolve(home)).isDirectory()) {
    console.error(`$WINDOW_STATE_HOME=${home} is not a Directory`)
    process.exit(-1);
}

const isWindows = process.platform === "win32";
const platformExport = isWindows ? "SET" : "export";

const platFormElectronMocha = isWindows
    ? "node_modules\\.bin\\electron-mocha.cmd"
    : "node_modiules/.bin/electron-mocha";

const isDebug = getFlag("--debug") !== "false";

const build = getFlag("--build") === "false" ? "" :
    "npm run build";

const cmds = [    
    `${build}`,
    `${platFormElectronMocha} ./built/__test__/**/*.test.js`
]
    .filter(x => x.trim() !== "")
    .join(" &&");
// run
const shell = require("shelljs");

shell.env.WINDOW_STATE_HOME = home;
shell.env.DEBUG = isDebug ? "window-state:*" : "";
shell.env.DEBUG_COLORS = isDebug;
shell.env.NODE_ENV = "test";
process.exit(shell.exec(cmds, {}).code);  