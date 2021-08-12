const m = require('./lib/index');
const feeder = require('./lib/fs/feeder');
const sorter = require('./lib/sorter');
const importer = require('./lib/fs/importer');

(async() => {
    const coll = await m({
        feeder: feeder({
            directory: './mig_test/'
        }),
        sorter: sorter({sortBy: 'baseName'}),
        importer: importer()
    });
    console.log(JSON.stringify(coll, null, 4));
})();