import Command from "../models/Command.js";
import Database from "../db/Database.js";
import Errors from "../models/Errors.js";
import inquirer from "inquirer";
import chalk from "chalk";

export default new Command(
	{
		name: "delete",
		description: "Delete a project from database",
	},
	async (projectName?: string) => {
		if (!(await Database.isInitialized())) await Database.init();

		const projects = await Database.getProjects();

		if (projects.length == 0) {
			Errors.projectsNotStored();
			return;
		}
		if (!projectName) {
			console.log(chalk.bold.red("\n🗑️ Delete a project from Database\n"));
			const data = await inquirer.prompt([
				{
					type: "input",
					name: "projectName",
					message: "Enter the project name:",
				},
			]);
			projectName = data.projectName;
		}
		if (!projects.some((p: any) => p.name == projectName)) {
			Errors.projectNotFound(projectName!);
			return;
		}
		await Database.deleteProject(projectName!);
		console.log(`\n🗑️ Project ${chalk.bold.red(projectName)} deleted!`);
	}
)
