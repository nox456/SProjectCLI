import Flag from "../models/Flag.js";
import cmds from "../cmd/index.js";

export default new Flag(
    {
        name: "projectName",
        description: "Specify the project name",
        cmds: ["delete", "open"],
        values: [],
        examples: ["$ sproject subcommand --projectName=example"],
    },
    (value?: string, cmd?: any) => {
        const subcommand = cmds.find((c) => c.name == cmd);
        if (subcommand) {
            subcommand.handler(value);
        }
    },
);
