import chalk from "chalk";
import Database from "../db/Database.js";
import Command from "../models/Command.js";
import inquirer from "inquirer";
import { execCmd } from "../utils/shell.js";
import { access } from "fs/promises";

export default new Command(
    {
        name: "add",
        description: "Add a project to database",
    },
    async () => {
        if (!(await Database.isInitialized())) await Database.init();
        console.log(chalk.bold.blue("\n💾 Add a project to Database\n"));
        const pwd = (await execCmd("pwd")) as string;
        const data = await inquirer.prompt([
            {
                type: "input",
                name: "name",
                message: "Enter the project name:",
            },
            {
                type: "input",
                name: "path",
                message: "Enter the project path:",
                default: pwd.trim(),
                validate: async (input: string) => {
                    try {
                        await access(input);
                        return true;
                    } catch (e: any) {
                        return e;
                    }
                },
            },
            {
                type: "input",
                name: "github",
                message: "Enter Github repository URL (optional):",
                default: "",
            },
        ] as any);
        await Database.addProject(data as { name: string; path: string; github: string });
        console.log(`\n🚀 ${chalk.bold.green("Project Added!")}`);
    },
);
