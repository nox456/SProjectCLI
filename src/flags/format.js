import Flag from "../models/Flag.js";
import cmds from "../cmd/index.js";

export default new Flag(
    {
        name: "format",
        description: "Specify the output format",
        cmds: ["list"],
        values: ["table", "json"],
        examples: ["$ sproject subcommand --format=json"],
    },
    (value, cmd) => {
        const subcommand = cmds.find((c) => c.name == cmd);
        subcommand.handler(value);
    },
);
