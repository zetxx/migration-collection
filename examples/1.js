const m = require('../lib/index');
const feeder = require('../lib/fs/feeder');
const sorter = require('../lib/sorter');
const importer = require('../lib/fs/importer');
const locker = require('../lib/locker');

(async() => {
    const coll = await m({
        feeder: feeder({
            directory: 'tests/unit/runtime/migration_dir'
        }),
        sorter: sorter({sortBy: 'baseName'}),
        importer: importer(),
        locker: locker()
    });
    console.log(JSON.stringify(coll, null, 4));
})();