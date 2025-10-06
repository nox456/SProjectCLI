import { exec, spawnSync } from "node:child_process";

export function execCmd(cmd: string): Promise<string> {
    return new Promise((resolve, reject) => {
        exec(cmd, (error, stdout, stderr) => {
            if (error) {
                reject(error);
            } else if (stderr) {
                reject(stderr);
            } else {
                resolve(stdout);
            }
        });
    });
}

export function spawnCmd(cmd: string, args: string[], cwd: string): Promise<void> {
    return new Promise((resolve, reject) => {
        const { stderr } = spawnSync(cmd, args, {
            stdio: "inherit",
            cwd,
        });
        if (stderr) {
            reject(stderr);
        } else {
            resolve();
        }
    });
}
