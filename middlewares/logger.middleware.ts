import { getLogger, handlers, setup } from "../deps.ts";
import configs from "../config/config.ts";

const { env } = configs;

await setup({
  handlers: {
    functionFmt: new handlers.ConsoleHandler("DEBUG", {
      // deno-lint-ignore no-explicit-any
      formatter: (logRecord: any) => {
        const time = new Date().toISOString();
        let msg = `${time} [${logRecord.level}] ${logRecord.msg}`;

        logRecord.args.forEach((arg: string, index: number) => {
          msg += `, arg${index}: ${arg}`;
        });
        return msg;
      },
    }),
  },
  loggers: {
    default: {
      level: "DEBUG",
      handlers: ["functionFmt"],
    },
    tests: {
      level: "CRITICAL",
      handlers: ["functionFmt"],
    },
  },
});

let loggerMiddleware = getLogger();

if (env === "test") {
  loggerMiddleware = getLogger("tests");
}

export default loggerMiddleware;
