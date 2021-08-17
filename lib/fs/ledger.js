const {stat, readFile, mkdir, writeFile} = require('fs/promises');
const {join} = require('path');

const initialFileContents = {
    locked: false,
    lockTime: null,
    migration: {
        list: []
    }
};

const cwdCheckCreate = async(cwd) => {
    try {
        await stat(cwd);
    } catch ({code}) {
        code === 'ENOENT' && await mkdir(cwd);
    }
};

const cwfCheckCreate = async(path) => {
    try {
        await stat(path);
    } catch ({code}) {
        code === 'ENOENT' &&
            await writeFile(path, JSON.stringify(initialFileContents));
        
    }
};

const runtimeFileContents = async(file) => {
    const contents = (await readFile(file)).toString('utf8');
    return JSON.parse(contents);
};
const updateLock = async({file, locked = true}) => {
    const contents = await runtimeFileContents(file);
    await writeFile(file, JSON.stringify({
        ...contents,
        locked,
        lockTime: (locked && new Date()) || contents.lockTime
    }));
};

const updateList = async({file, list}) => {
    const contents = await runtimeFileContents(file);
    await writeFile(file, JSON.stringify({
        ...contents,
        migration: {
            ...contents.migration,
            list
        }
    }));
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
            const {locked} = await runtimeFileContents(f);
            if (locked) {
                throw new Error('Lock acquired');
            }
            await updateLock({file: f});
        },
        unlock: async() => {
            const f = file();
            const {locked} = await runtimeFileContents(f);
            if (!locked) {
                throw new Error('Lock not acquired, why?');
            }
            await updateLock({file: f, locked: false});
        },
        exists: async({baseName, path}) => {
            const f = file();
            const {migration: {list}} = await runtimeFileContents(f);
            const unique = join(path, baseName);
            return list.findIndex((v) => v === unique) > -1;
        },
        markExists: async({baseName, path}) => {
            const f = file();
            const {migration: {list}} = await runtimeFileContents(f);
            list.push(join(path, baseName));
            await updateList({file: f, list});
        },
        exec: async(item) => {
            return 'execute';
        }
    }
};