import execCmd from "../utils/execCmd.js";
import chalk from "chalk";

export default class Database {
    static async init() {
        const path = await execCmd("printenv HOME")
        await execCmd(`echo '{}' > ${path.trim()}/.sproject-db.json`);
        console.log(chalk.bold.green(` Database file created at ${path.trim()}/.sproject-db.json`))
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
}
