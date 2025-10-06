export default class Project {
	name: string;
	path: string;
	github: string;

	constructor({ name, path, github }: { name: string; path: string; github: string }) {
		this.name = name;
		this.path = path;
		this.github = github;
	}
}
