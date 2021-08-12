const tap = require('tap');
const parser = require('../../lib/parser');

tap.test('Sorter', (t) => {
    console.log(parser([
        "--------------UP",
        "SELECT 'up'",
        "--------------DOWN",
        "SELECT 'down'"
    ]))
    // t.same(
    //     parser([
    //         "--------------UP",
    //         "SELECT 'up'",
    //         "--------------DOWN",
    //         "SELECT 'down'"
    //     ]),
    //     {},
    //     'should be same'
    // );
    t.end();
});

