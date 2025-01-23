import Flag from "./Flag.js";

export default new Flag(
    {
        name: "version",
        shortname: "v",
        description: "Show the current release version of the app",
        examples: ["$ sproject --version", "$ sproject -v"],
    },
    () => {
        console.log("v0.0.0")
    },
);
