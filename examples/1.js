const m = require('../lib/index');
const feeder = require('../lib/fs/feeder');
const sorter = require('../lib/sorter');
const importer = require('../lib/fs/importer');
const locker = require('../lib/locker');
const exec = require('../lib/exec');
const exists = require('../lib/exists');
const markExists = require('../lib/markExists');
const ledger = require('../lib/fs/ledger');

(async() => {
    const coll = await m({
        feeder: feeder({
            cwd: 'tests/unit/runtime/migration'
        }),
        sorter: sorter({sortBy: 'baseName'}),
        importer: importer(),
        locker: locker(),
        exec: exec(),
        exists: exists(),
        markExists: markExists(),
        ledger: ledger({
            cwd: 'tests/unit/runtime/ledger'
        })
    });
    console.log(JSON.stringify(coll, null, 4));
})();