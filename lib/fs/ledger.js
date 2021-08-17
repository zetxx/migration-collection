const {stat, readFile, mkdir, writeFile} = require('fs/promises');
const {join} = require('path');

const initialFileContents = {
    locked: false,
    migration: {
        list: []
    }
};

const cwdCheckCreate = async(cwd) => {
    try {
        await stat(cwd);
    } catch ({code}) {
        if (code === 'ENOENT') {
            await mkdir(cwd);
        }
    }
};

const cwfCheckCreate = async(path) => {
    try {
        await stat(path);
    } catch ({code}) {
        if (code === 'ENOENT') {
            await writeFile(path, JSON.stringify(initialFileContents));
        }
    }
};

const runtimeFileContents = async(file) => {
    const contents = (await readFile(file)).toString('utf8');
    return JSON.parse(contents);
};
const lock = async(file) => {
    const contents = await runtimeFileContents(file);
    await writeFile(file, JSON.stringify({...contents, locked: true}));
};

module.exports = ({
    cwd,
    cwf = 'runtime'
} = {}) => {
    const file = () => join(cwd, cwf);

    return {
        check: async() => {
            await stat(cwd);
            const f = file();
            await stat(f);
        },
        init: async() => {
            await cwdCheckCreate(cwd);
            await cwfCheckCreate(file());
        },
        lock: async() => {
            const f = file();
            const {locked} = (await runtimeFileContents(f)) || {};
            if (locked) {
                throw new Error('Lock acquired');
            }
            await lock(f);
        },
        unlock: async() => {}
    }
};