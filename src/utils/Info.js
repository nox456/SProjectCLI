import chalk from "chalk";
import flags from "../flags/index.js";
import cmds from "../cmd/index.js";
import Flag from "../flags/Flag.js";

export default class Info {
    /**
     * @returns {string}
     * */
    static flags() {
        return `
${chalk.bold.green("[AVAILABLE FLAGS]:")}
${flags.map((f) => `    ${
chalk.bold.blue(`--${f.name}${f.shortname ? `, -${f.shortname}` : ""}:`)} ${f.description}${f.values ? `${chalk.bold.blue(`    values: `)}${f.values.map(v => chalk.bold.green(v)).join("|")}` : ""}\n\t${f.examples.map((ex) => chalk.bold.gray(ex)).join("\n\t")}`).join("\n")}
`;
    }
    /**
     * @returns {string}
     * */
    static subcommands() {
        return `
${chalk.bold.green("[AVAILABLE SUBCOMMANDS]:")}
${cmds.map(c => `    ${chalk.bold.blue(`${c.name}:`)} ${c.description}`).join("\n")}
`
    }
    /**
     * @param {Flag} flag 
     * */
    static flagVales(flag) {
        return `
${chalk.bold.green("[AVAILABLE VALUES]:")}
${chalk.bold.blue(`    --${flag.name}=`)}${flag.values.map(v => chalk.bold.green(v)).join("|")}
`
    }
}
