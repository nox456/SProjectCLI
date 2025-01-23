import chalk from "chalk";
import flags from "../flags/index.js";

export default class Info {
    static flags() {
        return `
${chalk.bold.green("[AVAILABLE FLAGS]:")}
${flags.map((f) => `    ${
chalk.bold.blue(`--${f.name}, -${f.shortname}:`)} ${f.description}\n\t${f.examples.map((ex) => chalk.bold.gray(ex)).join("\n\t")}`).join("\n")}
`;
    }
}
