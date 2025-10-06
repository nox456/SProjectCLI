import chalk from "chalk";
import flags from "../flags/index.js";
import cmds from "../cmd/index.js";
import Flag from "../models/Flag.js";

export default class Info {
    static flags(): string {
        return `
${chalk.bold.green("[AVAILABLE FLAGS]:")}
${flags
    .map(
        (f) =>
            `    ${chalk.bold.blue(
                `--${f.name}${f.shortname ? `, -${f.shortname}` : ""}:`,
            )} ${f.description}${f.cmds.length > 0 ? `${chalk.bold.blue("    subcommands: ")}${f.cmds.map((c: string) => chalk.bold.green(c)).join("|")}` : ""}${f.values && f.values.length > 0 ? `${chalk.bold.blue(`    values: `)}${f.values.map((v: string) => chalk.bold.green(v)).join("|")}` : ""}\n\t${f.examples.map((ex) => chalk.bold.gray(ex)).join("\n\t")}`,
    )
    .join("\n")}
`;
    }
    static subcommands(): string {
        return `
${chalk.bold.green("[AVAILABLE SUBCOMMANDS]:")}
${cmds.map((c) => `    ${chalk.bold.blue(`${c.name}:`)} ${c.description}`).join("\n")}
`;
    }
    static flagValues(flag: Flag): string {
        return `
${chalk.bold.green("[AVAILABLE VALUES]:")}
${chalk.bold.blue(`    --${flag.name}=`)}${flag.values.map((v) => chalk.bold.green(v)).join("|")}
`;
    }
}
