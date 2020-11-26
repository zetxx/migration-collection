const {join} = require('path');
const readdir = require('util').promisify(require('fs').readdir);
const readFile = require('util').promisify(require('fs').readFile);

const importFile = ({dir, importFn}) => async(file) => {
    return Promise.resolve(importFn({
        file: join(dir, file),
        id: file
    }));
};

const defaultSortFn = (
    new Intl.Collator(
        undefined,
        {numeric: true, sensitivity: 'base'}
    )
).compare;

const separateUpDown = (strArray) => {
    return ['up', 'down']
        .map((dir) => ({
            dir,
            idx: strArray.findIndex((line) =>
                line.toLowerCase().endsWith(`-----${dir}`)
            )
        }))
        .filter(({idx}) => idx > -1)
        .reduce((ud, {idx: fromIdx, dir}, index, arr) => {
            const toIdx = (
                arr[index + 1] ||
                {idx: strArray.length}
            ).idx;

            return {
                ...ud,
                [dir]: strArray
                    .slice(fromIdx + 1, toIdx)
                    .join('\n')
            };
        }, {});
}

const defaultImportFn = async({file, id}) => {
    const content = separateUpDown(
        (await readFile(file))
            .toString('utf8')
            .split('\n')
            .map(s => s.trim())
    );
    if (!content.up || !content.down) {
        throw new Error('Up or down missing');
    }
    return {...content, id};
};

const collectFiles = async({
    directories,
    sortFn,
    importFn
}) => directories.reduce(
    async(list, dir) => {
        const l = await list;
        const nl = await readdir(dir);
        return l.concat({
            dir,
            migrations: await Promise.all(
                nl
                .sort(sortFn)
                .map(importFile({dir, importFn}))
            )
        });
    },
    Promise.resolve([])
);

module.exports = async({
    directories = [],
    sortFn = defaultSortFn,
    importFn = defaultImportFn
}) => {
    if (!Array.isArray(directories)) {
        throw new Error('directories should be array of paths');
    }
    const collection = await collectFiles({
        directories,
        sortFn,
        importFn
    });
    return collection;
};
