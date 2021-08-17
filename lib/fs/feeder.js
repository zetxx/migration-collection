const readdir = require('util').promisify(require('fs').readdir);
const {extname, join} = require('path');

module.exports = ({
    cwd,
    extensions = ['.sql']
} = {}) => {
    if (!cwd) {
        throw new Error('directory should be path');
    }
    return async() => {
        const migrations = (await readdir(cwd))
            .filter((fn) =>
                extensions.indexOf(extname(fn)) >= 0
            );
        return {
            dir: cwd,
            list: migrations.map((el) => ({
                baseName: el,
                path: cwd, 
            }))
        };
    };
};