const tap = require('tap');
const {join} = require('path');
const {unlink} = require('fs/promises');

const m = require('../../lib/index');
const feeder = require('../../lib/fs/feeder');
const sorter = require('../../lib/sorter');
const importer = require('../../lib/fs/importer');
const ledger = require('../../lib/fs/ledger');

const ls1 = {
    cwd: 'tests/unit/runtime/ledger',
    cwf: 'abc2'
};
const ul = async(obj) => {
    try {
        await unlink(join(obj.cwd, obj.cwf));
    } catch (e) {}
}

tap.test('Main', async(t) => {
    await ul(ls1);
    const coll1 = await m({
        feeder: feeder({
            cwd: 'tests/unit/runtime/migration'
        }),
        sorter: sorter({sortBy: 'baseName'}),
        importer: importer(),
        ledger: ledger(ls1)
    });
    const coll2 = await m({
        feeder: feeder({
            cwd: 'tests/unit/runtime/migration'
        }),
        sorter: sorter({sortBy: 'baseName'}),
        importer: importer(),
        ledger: ledger(ls1)
    });
    const coll3 = await m({
        feeder: feeder({
            cwd: 'tests/unit/runtime/migration',
            extensions: ['.zzz']
        }),
        sorter: sorter({sortBy: 'baseName'}),
        importer: importer(),
        ledger: ledger(ls1)
    });
    const r1 = [{"baseName":"1_bca.sql","path":"tests/unit/runtime/migration","content":["--------------UP","SELECT 'up'","--------------DOWN","SELECT 'down'"],"parsed":{"up":"SELECT 'up'","down":"SELECT 'down'"},"migrated":true},{"baseName":"2_abc.sql","path":"tests/unit/runtime/migration","content":["--------------UP","SELECT 'up'","--------------DOWN","SELECT 'down'"],"parsed":{"up":"SELECT 'up'","down":"SELECT 'down'"},"migrated":true},{"baseName":"5_abc.sql","path":"tests/unit/runtime/migration","content":["--------------UP","SELECT 'up'","--------------DOWN","SELECT 'down'"],"parsed":{"up":"SELECT 'up'","down":"SELECT 'down'"},"migrated":true},{"baseName":"123_abc.sql","path":"tests/unit/runtime/migration","content":["--------------UP","SELECT 'up'","--------------DOWN","SELECT 'down'"],"parsed":{"up":"SELECT 'up'","down":"SELECT 'down'"},"migrated":true}];
    const r2 = [{"baseName":"1_bca.sql","path":"tests/unit/runtime/migration","content":["--------------UP","SELECT 'up'","--------------DOWN","SELECT 'down'"],"parsed":{"up":"SELECT 'up'","down":"SELECT 'down'"},"migrated":false},{"baseName":"2_abc.sql","path":"tests/unit/runtime/migration","content":["--------------UP","SELECT 'up'","--------------DOWN","SELECT 'down'"],"parsed":{"up":"SELECT 'up'","down":"SELECT 'down'"},"migrated":false},{"baseName":"5_abc.sql","path":"tests/unit/runtime/migration","content":["--------------UP","SELECT 'up'","--------------DOWN","SELECT 'down'"],"parsed":{"up":"SELECT 'up'","down":"SELECT 'down'"},"migrated":false},{"baseName":"123_abc.sql","path":"tests/unit/runtime/migration","content":["--------------UP","SELECT 'up'","--------------DOWN","SELECT 'down'"],"parsed":{"up":"SELECT 'up'","down":"SELECT 'down'"},"migrated":false}];
    t.same(
        coll1,
        r1,
        'should be same'
    );
    t.same(
        coll2,
        r2,
        'should be same'
    );
    t.same(
        coll3,
        undefined,
        'should be same'
    );
    t.end();
});

