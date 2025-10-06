import Database from "../db/Database.js";
import Errors from "../models/Errors.js";
import Command from "../models/Command.js";
import chalk from "chalk";
import { table } from "table";

export default new Command(
    {
        name: "list",
        description: "Show the projects stored in database",
    },
    async (format?: string) => {
        if (!(await Database.isInitialized())) return Errors.dbNoInitialized();

        const projects = await Database.getProjects();

        if (projects.length == 0) {
			Errors.projectsNotStored();
            return;
        }

        if (!format || format == "table") {
            const data = [
                [
                    chalk.bold.blue("Name"),
                    chalk.bold.blue("Path"),
                    chalk.bold.blue("Github URL"),
                ],
            ];
            projects.forEach((project: any) => {
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
            console.log(JSON.stringify(projects, null, 2));
        }
    },
);
