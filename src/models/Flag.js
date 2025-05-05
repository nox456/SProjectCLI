export default class Flag {
    /**
     * @param {Object} param0
     * @param {string} param0.name - Full name of the flag (--{name})
     * @param {string} param0.shortname - Short name of the flag (-{shortname})
     * @param {string} param0.description - Description of the flag
     * @param {string} param0.cmd - Subcommand of the flag
     * @param {string[]} param0.values - Available values of the flag
     * @param {string[]} param0.examples - Array of examples of how use the flag
     * @param {Function} handler - Function that handle the flag operations
     * */
    constructor(
        { name, shortname, description, cmd, values, examples },
        handler,
    ) {
        this.name = name;
        this.shortname = shortname;
        this.description = description;
        this.cmd = cmd;
        this.values = values;
        this.examples = examples;
        this.handler = handler;
    }
}
