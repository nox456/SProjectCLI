import Flag from "../models/Flag.js";
import cmds from "../cmd/index.js";

export default new Flag(
    {
        name: "projectName",
        description: "Specify the project name",
        cmds: ["delete"],
        values: [],
        examples: ["$ sproject subcommand --projectName=example"],
    },
    (value, cmd) => {
        const subcommand = cmds.find((c) => c.name == cmd);
        subcommand.handler(value);
    },
);
