const readdir = require('util').promisify(require('fs').readdir);
const {extname, join} = require('path');

module.exports = ({
    directory,
    extensions = ['.sql']
}) => async() => {
    if (!directory) {
        throw new Error('directory should be paths');
    }
    const migrations = (await readdir(directory))
        .filter((fn) =>
            extensions.indexOf(extname(fn)) >= 0
        );
    return {
        dir: directory,
        list: migrations.map((el) => ({
            baseName: el,
            path: directory, 
        }))
    };
};