import Flag from "../models/Flag.js";
import Info from "./Info.js";
import chalk from "chalk";

export default class Errors {
    /**
     * @param {string[]} args
     * */
    static unexpectedArgument(args) {
        console.error(
            `${chalk.bold.red("ERROR:")} unexpected argument[s] --> ${chalk.bold.red(args.join(","))}\n${Info.flags()}\n${Info.subcommands()}`,
        );
    }
    /**
     * @param {string} arg
     * */
    static invalidFlag(arg) {
        console.error(
            `${chalk.bold.red("ERROR:")} invalid flag -> ${chalk.bold.red(arg)}\n${Info.flags()}`,
        );
    }
    /**
     * @param {string} arg
     * */
    static invalidCommand(arg) {
        console.error(
            `${chalk.bold.red("ERROR:")} invalid subcommand -> ${chalk.bold.red(arg)}\n${Info.subcommands()}`,
        );
    }
    static dbNoInitialized() {
        console.error(
            `${chalk.bold.red("ERROR:")} database hasn't been initialized\n -> Please use ${chalk.bold.blue("sproject add")} to store your first project!`,
        );
    }
    /**
     * @param {Flag} flag
     * @param {string} value
     * */
    static invalidFlagValue(value, flag) {
        console.error(
            `${chalk.bold.red("ERROR:")} invalid value -> ${chalk.bold.red(value)} for the flag -> ${chalk.bold.red(flag.name)}\n${Info.flagValues(flag)}`,
        );
    }
    /**
     * @param {Flag} flag
     * */
    static missingFlagValue(flag) {
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
	/**
	 * @param {string} projectName
	 * */
	static projectNotFound(projectName) {
		console.error(`${chalk.bold.red("ERROR:")} project not found -> ${chalk.bold.red(projectName)}\n`)
	}
}
