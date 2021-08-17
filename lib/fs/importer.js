const {join} = require('path');
const {readFile} = require('fs/promises');

const importFn = async({file}) => {
    const content = (await readFile(file))
        .toString('utf8')
        .split('\n')
        .map(s => s.trim());
    return content;
};

module.exports = (config) => async(o) => {
    const {baseName, path} = o;
    const file = join(path, baseName);
    const content = await importFn({
        file
    });
    return content;
};