const tap = require('tap');
const {unlink} = require('fs/promises');
const {join} = require('path');
const ledger = require('../../lib/fs/ledger');
const ls1 = {
    cwd: 'tests/unit/runtime/ledger',
    cwf: 'abc'
};

const ul = async(obj) => {
    try {
        await unlink(join(obj.cwd, obj.cwf));
    } catch (e) {}
}

tap.test('Ledger', async(t0) => {
    ledger();
    const ledger1 = ledger({cwd: './abc/dadeda'});
    const ledgerSuccess1 = ledger(ls1);
    await ul(ls1);
    tap.test('Incorrect cwd', (t1) => {
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
    tap.test('Correct cwd', async(t1) => {
        await t1.rejects(
            ledgerSuccess1.check,
            'check should rejects'
        );
        await t1.resolves(
            ledgerSuccess1.init,
            'check should resolves'
        );
        await t1.resolves(
            ledgerSuccess1.check,
            'check should resolves now'
        );
        await t1.resolves(
            ledgerSuccess1.lock,
            'lock should resolves'
        );
        await t1.resolves(
            ledgerSuccess1.unlock,
            'unlock should resolves'
        );
        await t1.resolveMatch(
            () => ledgerSuccess1.exists({baseName: 'a', path: 'a/b/c'}),
            false,
            'exists should resolves to false, resource not in list'
        );
        await t1.resolves(
            () => ledgerSuccess1.markExists({baseName: 'a', path: 'a/b/c'}),
            'markExists should resolves'
        );
        await t1.resolveMatch(
            () => ledgerSuccess1.exists({baseName: 'a', path: 'a/b/c'}),
            true,
            'exists should resolves to true, resource in list'
        );
        await t1.resolveMatch(
            () => ledgerSuccess1.exists({baseName: 'z', path: 'a/b/c'}),
            false,
            'exists should resolves to false, resource not in list'
        );
        await ledgerSuccess1.lock();
        await t1.rejects(
            ledgerSuccess1.lock,
            'lock should rejects, already locked'
        );
        await ledgerSuccess1.unlock();
        await t1.rejects(
            ledgerSuccess1.unlock,
            'unlock should rejects, already unlocked'
        );
        t1.end();
    });
    t0.end();
});

