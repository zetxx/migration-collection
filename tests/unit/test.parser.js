const tap = require('tap');
const parser = require('../../lib/parser');

tap.test('Parser', (t) => {
    console.log(parser([
        "SELECT 'up'"
    ]))
    t.same(
        parser([
            "--------------UP",
            "SELECT 'up'",
            "--------------DOWN",
            "SELECT 'down'"
        ]),
        {up: "SELECT 'up'", down: "SELECT 'down'"},
        'should be same up + down'
    );
    t.same(
        parser([
            "--------------UP",
            "SELECT 'up'"
        ]),
        {up: "SELECT 'up'"},
        'should be same up, no down'
    );
    t.same(
        parser([
            "--------------DOWN",
            "SELECT 'down'"
        ]),
        {down: "SELECT 'down'"},
        'should be same: down, no up'
    );
    t.same(
        parser([]),
        {},
        'should be same, no up, no down'
    );
    t.same(
        parser(["SELECT 'down'"]),
        {},
        'should be same, no up, no down but with content'
    );
    t.end();
});

