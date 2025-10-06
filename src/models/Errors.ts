import Flag from "../models/Flag.js";
import Info from "./Info.js";
import chalk from "chalk";

export default class Errors {
    static unexpectedArgument(args: string[]): void {
        console.error(
            `${chalk.bold.red("ERROR:")} unexpected argument[s] --> ${chalk.bold.red(args.join(","))}\n${Info.flags()}\n${Info.subcommands()}`,
        );
    }
    static invalidFlag(arg: string): void {
        console.error(
            `${chalk.bold.red("ERROR:")} invalid flag -> ${chalk.bold.red(arg)}\n${Info.flags()}`,
        );
    }
    static invalidCommand(arg: string): void {
        console.error(
            `${chalk.bold.red("ERROR:")} invalid subcommand -> ${chalk.bold.red(arg)}\n${Info.subcommands()}`,
        );
    }
    static dbNoInitialized() {
        console.error(
            `${chalk.bold.red("ERROR:")} database hasn't been initialized\n -> Please use ${chalk.bold.blue("sproject add")} to store your first project!`,
        );
    }
    static invalidFlagValue(value: string, flag: Flag): void {
        console.error(
            `${chalk.bold.red("ERROR:")} invalid value -> ${chalk.bold.red(value)} for the flag -> ${chalk.bold.red(flag.name)}\n${Info.flagValues(flag)}`,
        );
    }
    static missingFlagValue(flag: Flag): void {
        console.error(
            `${chalk.bold.red("ERROR:")} missing value for the flag -> ${chalk.bold.red(flag.name)}\n${Info.flagValues(flag)}`,
        );
    }
    static projectsNotStored() {
        console.error(
            chalk.bold.whiteBright(
                `--NO PROJECTS STORED--\n -> Please use ${chalk.bold.blue("sproject add")} to store your first project!`,
            ),
        );
    }
	static projectNotFound(projectName: string): void {
		console.error(`${chalk.bold.red("ERROR:")} project not found -> ${chalk.bold.red(projectName)}\n`)
	}
}
