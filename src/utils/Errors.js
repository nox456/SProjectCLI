import { ARGUMENT_ERRORS } from "./const/Errors.js";
import Info from "./Info.js";
import chalk from "chalk";

export function argumentError(args, type) {
    if (type == ARGUMENT_ERRORS.unexpected) {
        console.error(`${chalk.bold.red("ERROR:")} unexpected argument[s] --> ${chalk.bold.red(args.slice(1).join(","))}, only 1 argument expected\n${Info.flags()}`);
    } else if (type == ARGUMENT_ERRORS.invalidFlag) {
        console.error(`ERROR: invalid flag -> '${args[0]}'\n${Info.flags()}`)
    }
}
