const tap = require('tap');
const importer = require('../../lib/fs/importer')();


tap.test('Importer', async(t) => {
    t.same(await importer({
        baseName: '123_abc.sql',
        path: 'tests/unit/runtime/migration'
    }), [
        '--------------UP',
        "SELECT 'up'",
        '--------------DOWN',
        "SELECT 'down'"
      ]);
      t.rejects(importer({
        baseName: '123_abc.sql11',
        path: 'tests/unit/runtime/migration'
    }));
    t.end();
});

