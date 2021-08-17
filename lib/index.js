const parser = require('./parser');

module.exports = async({
    feeder,
    sorter,
    importer,
    ledger,
    locker,
    exec,
    exists,
    markExists
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
        try {
            await ledger.check();
        } catch (e) {
            await ledger.init();
        }
        await ledger.lock();
        await migration.list.reduce(async(prev, item) => {
            await prev;
            if (!(await ledger.exists(item))) {
                await ledger.exec(item);
                await ledger.markExists(item);
            }
        }, Promise.resolve());
        await ledger.unlock();
        return migration;
    }
};