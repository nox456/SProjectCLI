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
    (value?: string, cmd?: any) => {
        const subcommand = cmds.find((c) => c.name == cmd);
        if (subcommand) {
            subcommand.handler(value);
        }
    },
);
