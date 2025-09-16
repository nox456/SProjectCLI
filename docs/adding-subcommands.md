# How to Add a Subcommand to SProjectCLI

This guide explains the step-by-step process to add a new subcommand to the SProjectCLI application.

## Overview

The CLI app uses a modular architecture where subcommands are defined as `Command` objects and registered in a central index file. Each subcommand has a name, description, and handler function.

## Step-by-Step Instructions

### 1. Create the Subcommand File

Create a new JavaScript file in the `src/cmd/` directory for your subcommand:

```bash
touch src/cmd/your-command.js
```

### 2. Define the Command Structure

In your new file, import the required dependencies and create a Command instance:

```javascript
import Command from "../models/Command.js";
import chalk from "chalk";
// Import other dependencies as needed

export default new Command(
    {
        name: "your-command",
        description: "Description of what your command does",
    },
    async () => {
        // Your command logic here
        console.log(chalk.green("Your command executed successfully!"));
    }
);
```

### 3. Implement the Command Logic

Inside the handler function (the second parameter), implement your command's functionality:

```javascript
export default new Command(
    {
        name: "example",
        description: "An example subcommand",
    },
    async () => {
        console.log(chalk.bold.blue("\n🔧 Example Command\n"));
        
        // Your implementation here
        // Examples:
        // - Database operations: await Database.someOperation()
        // - User input: const answer = await inquirer.prompt([...])
        // - File operations: await fs.readFile(...)
        // - External commands: await execCmd("git status")
        
        console.log(chalk.bold.green("\n✅ Command completed!"));
    }
);
```

### 4. Register the Subcommand

Open `src/cmd/index.js` and add your new command to the exports:

```javascript
import Command from "../models/Command.js";
import add from "./add.js";
import list from "./list.js";
import deleteProject from "./delete.js";
import yourCommand from "./your-command.js"; // Add this import

/**
 * @type {Command[]}
 */
export default [add, list, deleteProject, yourCommand]; // Add to the array
```

### 5. Test Your Subcommand

Install and test your new subcommand:

```bash
npm run dev
sproject your-command
```

## Available Utilities and Dependencies

Your subcommand can use these commonly available utilities:

### Database Operations
```javascript
import Database from "../db/Database.js";

// Initialize database if needed
if (!(await Database.isInitialized())) await Database.init();

// Use database methods
await Database.addProject(data);
```

### User Input with Inquirer
```javascript
import inquirer from "inquirer";

const answers = await inquirer.prompt([
    {
        type: "input",
        name: "example",
        message: "Enter something:",
        default: "default value"
    }
]);
```

### Styled Console Output
```javascript
import chalk from "chalk";

console.log(chalk.red("Error message"));
console.log(chalk.green("Success message"));
console.log(chalk.bold.blue("Header"));
```

### Execute Shell Commands
```javascript
import execCmd from "../utils/execCmd.js";

const result = await execCmd("pwd");
console.log(result.trim());
```

### Loading Spinners
```javascript
import ora from "ora";

const spinner = ora("Loading...").start();
// Do work
spinner.succeed("Done!");
```

## Command Structure Requirements

### Command Class
Every subcommand must be an instance of the `Command` class with:
- `name`: String - The command name users will type
- `description`: String - Help text describing the command
- `handler`: Async Function - The function that executes when the command is called

### File Naming Convention
- Use kebab-case for command names and file names
- File should be in `src/cmd/` directory
- Export the Command instance as default

### Error Handling
Handle errors gracefully and provide meaningful messages:

```javascript
try {
    // Your operation
} catch (error) {
    console.error(chalk.red(`Error: ${error.message}`));
    process.exit(1);
}
```

## Example: Complete Subcommand

Here's a complete example of a status subcommand:

```javascript
// src/cmd/status.js
import Command from "../models/Command.js";
import chalk from "chalk";
import Database from "../db/Database.js";
import { table } from "table";

export default new Command(
    {
        name: "status",
        description: "Show CLI status and project count",
    },
    async () => {
        console.log(chalk.bold.blue("\n📊 SProjectCLI Status\n"));
        
        try {
            if (!(await Database.isInitialized())) {
                console.log(chalk.yellow("Database not initialized"));
                return;
            }
            
            const projects = await Database.getProjects();
            const data = [
                ["Metric", "Value"],
                ["Total Projects", projects.length.toString()],
                ["Database Status", "Initialized"],
                ["CLI Version", "0.2.2"]
            ];
            
            console.log(table(data));
            console.log(chalk.green("\n✅ Status check complete!"));
            
        } catch (error) {
            console.error(chalk.red(`Error: ${error.message}`));
            process.exit(1);
        }
    }
);
```

Then register it in `src/cmd/index.js`:

```javascript
import status from "./status.js";

export default [add, list, deleteProject, status];
```

## Tips and Best Practices

1. **Keep it simple**: Each subcommand should have a single, clear responsibility
2. **Use consistent styling**: Follow the existing patterns for console output and colors
3. **Handle async operations**: Most operations should be async, especially database and file operations
4. **Validate input**: Check user input and provide helpful error messages
5. **Test thoroughly**: Test your command with various inputs and edge cases
6. **Follow naming conventions**: Use descriptive names that match the CLI's existing style

## Adding Subcommand Flags

If your subcommand needs flags, you'll also need to create flag definitions in `src/flags/` and register them in the flags index. This is covered in a separate guide about adding flags.