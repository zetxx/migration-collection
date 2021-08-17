const tap = require('tap');
const feeder = require('../../lib/fs/feeder');
const feederA = feeder({
    cwd: 'tests/unit/runtime/migration'
});

const feederB = feeder({
    cwd: 'tests/unit/runtime/migration',
    extensions: ['.blabla']
});

tap.test('Feeder', async(t) => {
    t.throws(feeder, new Error('directory should be path'), 'should throw');
    t.same(
        await feederA(),
        {
            dir: 'tests/unit/runtime/migration',
            list: [{
                baseName: '123_abc.sql',
                path: 'tests/unit/runtime/migration'
            }, {
                baseName: '1_bca.sql',
                path: 'tests/unit/runtime/migration'
            }, {
                baseName: '2_abc.sql',
                path: 'tests/unit/runtime/migration'
            }, {
                baseName: '5_abc.sql',
                path: 'tests/unit/runtime/migration'
            }]
        }
    );
    t.same(
        await feederB(),
        {
            dir: 'tests/unit/runtime/migration',
            list: []
        },
        'should return empty list'
    );
    t.end();
});

