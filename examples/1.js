const m = require('../lib/index');
const feeder = require('../lib/fs/feeder');
const sorter = require('../lib/sorter');
const importer = require('../lib/fs/importer');
const exec = require('../lib/exec');
const exists = require('../lib/exists');
const markExists = require('../lib/markExists');
const ledger = require('../lib/fs/ledger');

(async() => {
    try {
        const coll = await m({
            feeder: feeder({
                cwd: 'tests/unit/runtime/migration'
            }),
            sorter: sorter({sortBy: 'baseName'}),
            importer: importer(),
            exec: exec(),
            exists: exists(),
            markExists: markExists(),
            ledger: ledger({
                cwd: 'tests/unit/runtime/ledger'
            })
        });
        console.log(JSON.stringify(coll, null, 4));
    } catch (e) {
        console.error(e);
    }
})();