import * as debug from "debug";
debug.formatters.x = (x: any) => `${x}`;
export const createDebug = (moduleKey: string) => {
    return debug(`window-state:${moduleKey}`);
};
