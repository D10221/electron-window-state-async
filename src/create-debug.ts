import * as debug from "debug";
debug.formatters.x = (x: any) => `${x}`;
debug.formatters.e = (x: any) => `error: ${x}`;
debug.formatters.w = (x: any) => `warning: ${x}`;
export const createDebug = (moduleKey: string) => {
    return debug(`window-state:${moduleKey}`);
};
