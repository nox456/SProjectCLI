import Errors from "../models/Errors.js";
import flags from "../flags/index.js";
import cmds from "../cmd/index.js";
import Command from "./Command.js";
import Flag from "./Flag.js";

export default class Args {
    static validate(args: string[]): boolean {
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
                const subFlags = flags.filter((f) => f.cmds.includes(args[0]));
                if (args[1].startsWith("--")) {
                    const flagName = args[1].slice(
                        2,
                        args[1].indexOf("=") == -1
                            ? args[1].length
                            : args[1].indexOf("="),
                    );
                    const flag = subFlags.find((f) => f.name == flagName);
                    if (!flag) {
                        Errors.invalidFlag(args[1]);
                        return false;
                    } else if (!args[1].includes("=")) {
                        Errors.missingFlagValue(flag);
                        return false;
                    }
                } else {
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
    static handleFlag(cmd: Command | string, arg: string, value?: string): void {
        const flag = flags.find(
            (f) => f.name == arg.slice(2) || f.shortname == arg.slice(1),
        );
        if (!flag) return;
        if (value) {
            if (flag.values.length > 0 && !flag.values.includes(value))
                return Errors.invalidFlagValue(value, flag);
            flag.handler(value, cmd);
        } else {
            flag.handler();
        }
    }
    static async handleSubcommand(arg: string): Promise<void> {
        const subcommand = cmds.find((c) => c.name == arg);
        if (subcommand) {
            await subcommand.handler();
        }
    }
}
