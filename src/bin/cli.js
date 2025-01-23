#!/usr/bin/env node
import Args from "../utils/Args.js";

const args = process.argv.slice(2)

if (!Args.validate(args)) {
    process.exit(1)
}

if (args[0].startsWith("-")) {
    Args.handleFlag(args[0])
    process.exit(0)
} else {
    Args.handleSubcommand(args[0])
}
