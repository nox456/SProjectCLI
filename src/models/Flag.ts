export default class Flag {
    name: string;
    shortname?: string;
    description: string;
    cmds: string[];
    values: string[];
    examples: string[];
    handler: (value?: string, cmd?: any) => void;

    constructor(
        { name, shortname, description, cmds, values, examples }: {
            name: string;
            shortname?: string;
            description: string;
            cmds: string[];
            values: string[];
            examples: string[];
        },
        handler: (value?: string, cmd?: any) => void,
    ) {
        this.name = name;
        this.shortname = shortname;
        this.description = description;
        this.cmds = cmds;
        this.values = values;
        this.examples = examples;
        this.handler = handler;
    }
}
