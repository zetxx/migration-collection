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
        const migrateResult = await migration.list.reduce(async(prev, item) => {
            const mr = await prev;
            if (!(await ledger.exists(item))) {
                await ledger.exec(item);
                await ledger.markExists(item);
                mr.push({...item, migrated: true});
            } else {
                mr.push({...item, migrated: false});
            }
            return mr;
        }, Promise.resolve([]));
        await ledger.unlock();
        return migrateResult;
    }
};