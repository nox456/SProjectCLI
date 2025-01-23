import Command from "./Command.js";

export default new Command(
    {
        name: "add",
        description: "Add a project to database",
    },
    () => {
        console.log("adding...");
    },
);
