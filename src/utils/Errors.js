import Info from "./Info.js";
import chalk from "chalk";

export default class Errors {
    /**
     * @param {string[]} args 
     * */
    static unexpectedArgument(args) {
        console.error(`${chalk.bold.red("ERROR:")} unexpected argument[s] --> ${chalk.bold.red(args.slice(1).join(","))}, only 1 argument expected\n${Info.flags()}\n${Info.subcommands()}`);
    }
    /**
     * @param {string[]} args 
     * */
    static invalidFlag(args) {
        console.error(`${chalk.bold.red("ERROR:")} invalid flag -> ${chalk.bold.red(args[0])}\n${Info.flags()}`)
    }
    /**
     * @param {string[]} args 
     * */
    static invalidCommand(args) {
        console.error(`${chalk.bold.red("ERROR:")} invalid subcommand -> ${chalk.bold.red(args[0])}\n${Info.subcommands()}`)
    }
}

