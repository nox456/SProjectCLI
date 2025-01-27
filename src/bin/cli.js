#!/usr/bin/env node
import Args from "../utils/Args.js";

import help from "../flags/help.js";

const args = process.argv.slice(2)

if (args.length == 0) {
    help.handler()
    process.exit(0)
} else if (!Args.validate(args)) {
    process.exit(1)
}

if (args[0].startsWith("-")) {
    Args.handleFlag(args[0])
    process.exit(0)
} else {
    await Args.handleSubcommand(args[0])
    process.exit(0)
}
