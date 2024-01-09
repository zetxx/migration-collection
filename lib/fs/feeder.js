const {readdir} = require('fs/promises');
const {extname, join} = require('path');

module.exports = ({
    cwd,
    extensions = ['.sql']
} = {}) => {
    if (!cwd) {
        throw new Error('directory should be path');
    }
    if (!(cwd instanceof Array)) {
        throw new Error('cwd should be of type array');
    }
    return async() => {
        const migrations = (await Promise.all(cwd.map(async(c) => {
            const list = await readdir(c);
            return list
                .filter((fn) =>
                    extensions.indexOf(extname(fn)) >= 0
                )
                .map((f) => ({path: c, baseName: f}))
        })))
            .reduce((a, c) => a.concat(c), []);
        return {
            dir: cwd,
            list: migrations
        };
    };
};