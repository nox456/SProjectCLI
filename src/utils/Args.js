import { argumentError } from "../utils/Errors.js";
import { ARGUMENT_ERRORS } from "../utils/const/Errors.js";
import FLAGS from "./const/Flags.js";

export default class Args {
    static validate(args) {
        if (args.length > 1) {
            argumentError(args, ARGUMENT_ERRORS.unexpected)
            return false
        } else if (args[0].startsWith("--") && !Object.keys(FLAGS).includes(args[0].slice(2))) {
            argumentError(args, ARGUMENT_ERRORS.invalidFlag)
            return false
        }
        return true
    }
}
