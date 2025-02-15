import Database from "../db/Database.js";
import Errors from "../utils/Errors.js";
import Command from "./Command.js";
import chalk from "chalk";
import { readFile } from "fs/promises";
import { join } from "path";
import execCmd from "../utils/execCmd.js";
import { table } from "table";

const HOME = await execCmd("printenv HOME");

export default new Command(
    {
        name: "list",
        description: "Show the projects stored in database",
    },
    async (format) => {
        if (!(await Database.isInitialized())) return Errors.dbNoInitialized();
        const fileContent = await readFile(
            join(HOME.trim(), ".sproject-db.json"),
            {
                encoding: "utf-8",
            },
        );
        const { projects } = JSON.parse(fileContent);
        if (projects.length > 0) {
            if (!format || format == "table") {
                const data = [
                    [
                        chalk.bold.blue("Name"),
                        chalk.bold.blue("Path"),
                        chalk.bold.blue("Github URL"),
                    ],
                ];
                projects.forEach((project) => {
                    const { github } = project;
                    const githubUrl = github.slice(
                        github.indexOf("/", github.indexOf("github.com")) + 1,
                    );
                    data.push([
                        chalk.bold.cyan(project.name),
                        chalk.bold.white(project.path),
                        chalk.bold.green(githubUrl) || chalk.bold.red("NOT LINKED"),
                    ]);
                });
                console.log(
                    table(data, {
                        header: {
                            content: chalk.bold.blue("Projects"),
                            alignment: "center",
                        },
                    }),
                );
            } else if (format == "json") {
                console.log(fileContent)
            }
        } else {
            console.log(chalk.bold.whiteBright("--NO PROJECTS STORED--"))
        }
    },
);
