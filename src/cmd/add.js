import Database from "../db/Database.js";
import Command from "./Command.js";

export default new Command(
    {
        name: "add",
        description: "Add a project to database",
    },
    async () => {
        if (!await Database.isInitialized()) await Database.init()
    },
);
