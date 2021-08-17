const tap = require('tap');
const {unlink} = require('fs/promises');
const {join} = require('path');
const ledger = require('../../lib/fs/ledger');
const ls1 = {
    cwd: 'tests/unit/runtime/ledger',
    cwf: 'abc'
};

const ul = (obj) => {
    try {
        await unlink(path.join(obj.cwd, obj.cwf));
    } catch (e) {}
}

tap.test('Ledger', async(t0) => {
    ledger();
    const ledger1 = ledger({cwd: './abc/dadeda'});
    const ledgerSuccess1 = ledger(ls1);
    await ul(ls1);
    tap.test('Inncorect cwd', (t1) => {
        t1.rejects(
            ledger1.check,
            'check should rejects'
        );
        t1.rejects(
            ledger1.init,
            'init should rejects'
        );
        t1.rejects(
            ledger1.lock,
            'lock should rejects'
        );
        t1.rejects(
            ledger1.unlock,
            'unlock should rejects'
        );
        t1.rejects(
            () => ledger1.exists({
                baseName: 'z',
                path: 'y'
            }),
            'exists should rejects'
        );
        t1.rejects(
            () => ledger1.markExists({
                baseName: 'z',
                path: 'y'
            }),
            'markExists should rejects'
        );
        t1.resolves(
            () => ledger1.exec({}),
            'exec should resolves'
        );
        t1.end();
    });
    tap.test('Corect cwd', (t1) => {
        t1.rejects(
            ledgerSuccess1.check,
            'check should rejects'
        );
        t1.end();
    });
    t0.end();
});

