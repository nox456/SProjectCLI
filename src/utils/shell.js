import { exec, spawnSync } from "node:child_process";

/**
 * @param {string} cmd
 * @returns {Promise<string>}
 * */
export function execCmd(cmd) {
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

/**
 * @param {string} cmd
 * @param {string[]} args
 * @returns {Promise<void>}
 * */
export function spawnCmd(cmd, args, cwd) {
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
