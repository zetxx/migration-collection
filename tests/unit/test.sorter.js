const tap = require('tap');
const sorterA = require('../../lib/sorter')();
const sorterB = require('../../lib/sorter')({sortBy: 'abc'});

tap.test('Sorter', (t) => {
    t.same(
        ['2_b', '2_a', '1_a'].sort(sorterA),
        [ '1_a', '2_a', '2_b' ],
        'should be same'
    );
    t.same(
        [{abc: '2_b'}, {abc: '2_a'}, {abc: '1_a'}].sort(sorterB),
        [{abc: '1_a'}, {abc: '2_a'}, {abc: '2_b'}],
        'should be same'
    );
    t.end();
});

