import Flag from "../models/Flag.js";
import Info from "../models/Info.js";

export default new Flag(
    {
        name: "help",
        shortname: "h",
        description: "Show a help message",
        cmds: [],
        examples: ["$ sproject --help", "$ sproject -h"],
    },
    () => {
        console.log(
            `SProjectCLI\n\nA CLI app to manage projects based of simplicity\n${Info.flags()}\n${Info.subcommands()}`,
        );
    },
);
