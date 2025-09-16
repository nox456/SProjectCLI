import Command from "../models/Command.js";
import add from "./add.js";
import list from "./list.js";
import deleteProject from "./delete.js";
import open from "./open.js";

/**
 * @type {Command[]}
 * */
export default [add, list, deleteProject, open];
