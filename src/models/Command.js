export default class Command {
    /**
     * @param {Object} param0 
     * @param {string} param0.name - Name of the subcommand
     * @param {string} param0.description - Description of the subcommand
     * @param {Function} handler - Function that handle the subcommand operations
     * */
    constructor({ name, description }, handler) {
        this.name = name
        this.description = description
        this.handler = handler
    }
}
