import chalk from "chalk";
import Database from "../db/Database.js";
import Command from "../models/Command.js";
import { spawnCmd } from "../utils/shell.js";
import inquirer from "inquirer";
import Errors from "../models/Errors.js";

export default new Command(
    {
        name: "open",
        description:
            "Open a project with an editor using $EDITOR environment variable (fallback with nano)",
    },
    async (projectName) => {
        if (!(await Database.isInitialized())) await Database.init();

        const projects = await Database.getProjects();

        if (projects.length == 0) {
            Errors.projectsNotStored();
            return;
        }
        if (!projectName) {
            console.log(chalk.bold.red("\n⚡Open a project with an editor\n"));
            const data = await inquirer.prompt([
                {
                    type: "input",
                    name: "projectName",
                    message: "Enter the project name:",
                },
            ]);
            projectName = data.projectName;
        }
        const project = projects.find((p) => p.name == projectName);
        if (!project) {
            Errors.projectNotFound(projectName);
            return;
        }
        const editor = process.env.EDITOR || "nano";
        await spawnCmd(editor, [], project.path);
    },
);
