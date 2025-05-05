export default class Project {
	/**
	 * @param {Object} param0 
	 * @param {string} param0.name - Name of the project
	 * @param {string} param0.path - Path of the project
	 * @param {string} param0.github - Github repository URL
	 * */
	constructor({ name, path, github }) {
		this.name = name;
		this.path = path;
		this.github = github;
	}
}
