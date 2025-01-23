import { argumentError } from "../utils/Errors.js";
import { ARGUMENT_ERRORS } from "../utils/const/Errors.js";
import flags from "../flags/index.js";

export default class Args {
    /**
     * @param {string[]} args
     * @return {boolean}
     * */
    static validate(args) {
        if (args.length > 1) {
            argumentError(args, ARGUMENT_ERRORS.unexpected);
            return false;
        } else if (
            args[0].startsWith("-") && !args[0].startsWith("--") &&
            !flags.map((f) => f.shortname).includes(args[0].slice(1))
        ) {
            argumentError(args, ARGUMENT_ERRORS.invalidFlag);
            return false;
        } else if (
            args[0].startsWith("--") &&
            !flags.map((f) => f.name).includes(args[0].slice(2))
        ) {
            argumentError(args, ARGUMENT_ERRORS.invalidFlag);
            return false;
        }
        return true;
    }
    /**
     * @param {string} arg 
     * */
    static handleFlag(arg) {
        const flag = flags.find(f => f.name == arg.slice(2) || f.shortname == arg.slice(1))
        flag.handler()
    }
}
