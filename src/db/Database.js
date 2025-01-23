import execCmd from "../utils/execCmd.js";
import { readFile, writeFile } from "fs/promises";
import { join } from "path";
import chalk from "chalk";

const HOME = await execCmd("printenv HOME");

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
    /**
     * @returns {Promise<boolean>}
     * */
    static async isInitialized() {
        const files = await execCmd("ls -a $HOME");
        return files
            .split("\n")
            .filter((l) => l != "." && l != ".." && l.includes("."))
            .includes(".sproject-db.json");
    }
    static async addProject({ name, path, github }) {
        const content = await readFile(join(HOME.trim(), ".sproject-db.json"), {
            encoding: "utf8",
        });
        const data = JSON.parse(content);
        data["projects"].push({ name, path, github });
        const formattedData = await execCmd(`echo '${JSON.stringify(data)}' | jq .`)
        await writeFile(join(HOME.trim(), ".sproject-db.json"), formattedData)
    }
}
