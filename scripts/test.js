#!/usr/bin/env node

/**
 * test launcher
 * export WINDOW_STATE_HOME=$HOME/tmp
 */

const fs = require("fs");
const path = require("path");
const getFlag = (key) => {
    const args = process.argv.slice(2);
    const i = args.indexOf(key);
    if(i === -1) return null;
    return args[i+1];
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
const debug = getFlag("--debug") === "false" ? ""
    : "DEBUG=\"window-state:*\" ";

const build = getFlag("--build") === "false" ? "" :
    "npm run build &&";
// run
process.exit(
    require("shelljs")
        .exec(
        `${platformExport} ` +
        `${debug}` +
        `NODE_ENV="test" ` +
        "DEBUG_COLORS=true " +
        `WINDOW_STATE_HOME='${home}' &&` +
        `${build}` +
        "echo $WINDOW_STATE_HOME &&" +
        ` ${platFormElectronMocha} ` +
        " ./built/__test__/**/*.test.js"
        ).code);    