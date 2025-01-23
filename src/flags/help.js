import Flag from "./Flag.js";
import Info from "../utils/Info.js";

export default new Flag(
    {
        name: "help",
        shortname: "h",
        description: "Show a help message",
        examples: ["$ sproject --help", "$ sproject -h"],
    },
    () => {
        console.log(
            `SProjectCLI\n\nA CLI app to manage projects based of simplicity\n${Info.flags()}`,
        );
    },
);
