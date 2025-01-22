import FLAGS from "./const/Flags.js"
import chalk from "chalk"

export default class Info {
    static flags() {
        return `
${chalk.bold.green("[AVAILABLE FLAGS]:")}\n${Object.keys(FLAGS).map(f => `    ${chalk.bold.blue(f)}: ${FLAGS[f]}`).join("\n")}
`
    }
}
