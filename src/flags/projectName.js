import Flag from "../models/Flag.js";
import cmds from "../cmd/index.js";

export default new Flag(
    {
        name: "projectName",
        description: "Specify the project name",
        cmd: "delete",
		values: [],
        examples: ["$ sproject delete --projectName=example"]
    },
    (value) => {
        const subcommand = cmds.find(c => c.name == "delete")
        subcommand.handler(value)
    }
)
