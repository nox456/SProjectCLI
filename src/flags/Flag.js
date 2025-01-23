export default class Flag {
    /**
     * @param {Object} param0 
     * @param {string} param0.name - Full name of the flag (--{name})
     * @param {string} param0.shortname - Short name of the flag (-{shortname})
     * @param {string} param0.description - Description of the flag
     * @param {string[]} param0.examples - Array of examples of how use the flag
     * @param {Function} handler - Function that handle the flag operations
     * */
    constructor({ name, shortname, description, examples }, handler) {
        this.name = name
        this.shortname = shortname
        this.description = description
        this.examples = examples
        this.handler = handler
    }
}
