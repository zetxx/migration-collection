const parser = require('./parser');

module.exports = async({
    feeder,
    sorter,
    importer,
    lock,
    unlock,
    exec
}) => {
    const migration = await feeder();
    if (migration.list.length) {
        migration.list.sort(sorter);
        migration.list = await Promise.all(
            migration.list.map(async(o) => ({
                ...o, content: await importer(o)
            }))
        );
        migration.list = migration.list.map((o) => ({
            ...o, parsed: parser(o.content)
        }));
        return migration;
    }
};