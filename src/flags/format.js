import Flag from "./Flag.js";
import cmds from "../cmd/index.js";


export default new Flag(
    {
        name: "format",
        shortname: "f",
        description: "Specify the output format",
        cmd: "list",
        values: ["table", "json"],
        examples: ["$ sproject list --format=json", "$ sproject -f json"]
    },
    (value) => {
        const subcommand = cmds.find(c => c.name == "list")
        subcommand.handler(value)
    }
)
