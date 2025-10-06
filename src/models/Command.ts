export default class Command {
    name: string;
    description: string;
    handler: (arg?: string) => Promise<void>;

    constructor(
        { name, description }: { name: string; description: string },
        handler: (arg?: string) => Promise<void>,
    ) {
        this.name = name;
        this.description = description;
        this.handler = handler;
    }
}
