import Errors from "../utils/Errors.js";
import flags from "../flags/index.js";
import cmds from "../cmd/index.js";

export default class Args {
    /**
     * @param {string[]} args
     * @return {boolean}
     * */
    static validate(args) {
        if (args.length > 1) {
            Errors.unexpectedArgument(args);
            return false;
        } else if (
            args[0].startsWith("-") &&
            !args[0].startsWith("--") &&
            !flags.map((f) => f.shortname).includes(args[0].slice(1))
        ) {
            Errors.invalidFlag(args);
            return false;
        } else if (
            args[0].startsWith("--") &&
            !flags.map((f) => f.name).includes(args[0].slice(2))
        ) {
            Errors.invalidFlag(args);
            return false;
        } else if (!cmds.map(c => c.name).includes(args[0]) && !args[0].startsWith("-")) {
            Errors.invalidCommand(args);
            return false;
        }
        return true;
    }
    /**
     * @param {string} arg
     * */
    static handleFlag(arg) {
        const flag = flags.find(
            (f) => f.name == arg.slice(2) || f.shortname == arg.slice(1),
        );
        flag.handler();
    }
    static handleSubcommand(arg) {
        const subcommand = cmds.find(c => c.name == arg)
        subcommand.handler()
    }
}
