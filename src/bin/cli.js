#!/usr/bin/env node
import Args from "../utils/Args.js";

const args = process.argv.slice(2)

if (!Args.validate(args)) {
    process.exit(1)
}

console.log("Hello World!!")
console.log(args)

process.exit(0)
