const m = require('../lib/index');
const feeder = require('../lib/fs/feeder');
const sorter = require('../lib/sorter');
const importer = require('../lib/fs/importer');
const locker = require('../lib/locker');
const exec = require('../lib/exec');
const exists = require('../lib/exists');
const markExists = require('../lib/markExists');

(async() => {
    const coll = await m({
        feeder: feeder({
            directory: 'tests/unit/runtime/migration_dir'
        }),
        sorter: sorter({sortBy: 'baseName'}),
        importer: importer(),
        locker: locker(),
        exec: exec(),
        exists: exists(),
        markExists: markExists()
    });
    console.log(JSON.stringify(coll, null, 4));
})();