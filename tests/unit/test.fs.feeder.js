const tap = require('tap');
const feeder = require('../../lib/fs/feeder');
const feederA = feeder({
    directory: 'tests/unit/runtime/migration_dir'
});

const feederB = feeder({
    directory: 'tests/unit/runtime/migration_dir',
    extensions: ['.blabla']
});

tap.test('Feeder', async(t) => {
    t.throws(feeder, new Error('directory should be path'), 'should throw');
    t.same(
        await feederA(),
        {
            dir: 'tests/unit/runtime/migration_dir',
            list: [{
                baseName: '123_abc.sql',
                path: 'tests/unit/runtime/migration_dir'
            }, {
                baseName: '1_bca.sql',
                path: 'tests/unit/runtime/migration_dir'
            }, {
                baseName: '2_abc.sql',
                path: 'tests/unit/runtime/migration_dir'
            }, {
                baseName: '5_abc.sql',
                path: 'tests/unit/runtime/migration_dir'
            }]
        }
    );
    t.same(
        await feederB(),
        {
            dir: 'tests/unit/runtime/migration_dir',
            list: []
        },
        'should return empty list'
    );
    t.end();
});

