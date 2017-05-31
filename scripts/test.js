#!/usr/bin/env node

/**
 * test launcher
 * export WINDOW_STATE_HOME=$HOME/tmp
 */
process.exit(
    require("shelljs")
    .exec(
        "export DEBUG=\"window-state:*\" "+
        "DEBUG_COLORS=true " +
        `WINDOW_STATE_HOME='${process.env.WINDOW_STATE_HOME}' &&`+
        "npm run build &&" +
        "echo $WINDOW_STATE_HOME &&" +
        "node_modules/.bin/electron-mocha "+
        " ./built/__test__/**/*.test.js"
    ).code);    