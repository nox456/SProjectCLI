import { execCmd } from "../utils/shell.js";
import { readFile, writeFile } from "fs/promises";
import { join } from "path";
import chalk from "chalk";
import Project from "../models/Project.js";

const HOME = (await execCmd("printenv HOME")) as string;

export default class Database {
    static async init() {
        await execCmd(
            `echo '{ "projects": [] }' > ${HOME.trim()}/.sproject-db.json`,
        );
        console.log(
            chalk.bold.green(
                ` Database file created at ${HOME.trim()}/.sproject-db.json`,
            ),
        );
    }
    static async isInitialized(): Promise<boolean> {
        const files = (await execCmd("ls -a $HOME")) as string;
        return files
            .split("\n")
            .filter((l) => l != "." && l != ".." && l.includes("."))
            .includes(".sproject-db.json");
    }
    static async addProject({ name, path, github }: { name: string; path: string; github: string }): Promise<void> {
        const content = await readFile(join(HOME.trim(), ".sproject-db.json"), {
            encoding: "utf8",
        });
        const data = JSON.parse(content);
        data["projects"].push({ name, path, github });
        const formattedData = (await execCmd(
            `echo '${JSON.stringify(data)}' | jq .`,
        )) as string;
        await writeFile(join(HOME.trim(), ".sproject-db.json"), formattedData);
    }
    static async getProjects(): Promise<Project[]> {
        const content = await readFile(join(HOME.trim(), ".sproject-db.json"), {
            encoding: "utf8",
        });
        const data = JSON.parse(content);
        return data["projects"];
    }
    static async deleteProject(projectName: string): Promise<void> {
        const content = await readFile(join(HOME.trim(), ".sproject-db.json"), {
            encoding: "utf8",
        });
        const data = JSON.parse(content);
        data["projects"] = data["projects"].filter(
            (p: any) => p.name != projectName,
        );
        const formattedData = (await execCmd(
            `echo '${JSON.stringify(data)}' | jq .`,
        )) as string;
        await writeFile(join(HOME.trim(), ".sproject-db.json"), formattedData);
    }
}
