import Errors from "../utils/Errors.js";
import flags from "../flags/index.js";
import cmds from "../cmd/index.js";

export default class Args {
    /**
     * @param {string[]} args
     * @return {boolean}
     * */
    static validate(args) {
        if (args[0].startsWith("-")) {
            if (
                flags.filter(
                    (f) =>
                        f.name == args[0].slice(2) ||
                        f.shortname == args[0].slice(1),
                ).length == 0
            ) {
                Errors.invalidFlag(args[0]);
                return false;
            }
        } else if (cmds.map((c) => c.name).includes(args[0])) {
            if (args.length == 2) {
                const subFlags = flags.filter((f) => f.cmd == args[0]);
                if (
                    args[1].startsWith("-") &&
                    subFlags.filter(
                        (f) =>
                            f.name == args[1].slice(2) ||
                            f.shortname == args[1].slice(1),
                    ).length == 0
                ) {
                    Errors.invalidFlag(args[1]);
                    return false;
                }
                if (!args[1].startsWith("-")) {
                    Errors.unexpectedArgument(args.slice(1));
                    return false;
                }
            } else if (args.length > 2) {
                Errors.unexpectedArgument(args.slice(1));
                return false;
            }
        } else {
            Errors.invalidCommand(args[0]);
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
    /**
     * @param {string} arg
     * */
    static async handleSubcommand(arg) {
        const subcommand = cmds.find((c) => c.name == arg);
        await subcommand.handler();
    }
}
