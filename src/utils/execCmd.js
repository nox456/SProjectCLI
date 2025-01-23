import { exec } from "node:child_process";

/**
 * @param {string} cmd 
 * @returns {Promise<string>}
 * */
export default function execCmd(cmd) {
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
