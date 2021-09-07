# Migration collection

[![Build Status](https://travis-ci.com/zetxx/migration-collection.svg?branch=master)](https://app.travis-ci.com/github/zetxx/migration-collection)

Simple implementation of migration collection, ideas written down.
aims to be easy for use, easy to be extended.

currently only filesystem and mssql migration is implemented

- `feeder` - feeds with data collection, reads files from fs, and filters them
based on extension
- `sorter` - sorts files based on it integer key
eg. if file name is `121_abc.sql`, integer keys is `121`
- `importer` - imports migration file
- `parser` - parses imported file
- `ledger` - do the migration, acquire locks, check if migration is executed,
execute it, and write it down

## Examples

`examples/fs.js` - fs example
`examples/mssql.js` - ms sql example

all of them should return following structure

```js
[
    {
        "baseName": "1_bca.sql",
        "path": "tests/unit/runtime/migration",
        "content": [
            "--------------UP",
            "SELECT 'up'",
            "--------------DOWN",
            "SELECT 'down'"
        ],
        "parsed": {
            "up": "SELECT 'up'",
            "down": "SELECT 'down'"
        },
        "migrated": false
    },
    {
        "baseName": "2_abc.sql",
        "path": "tests/unit/runtime/migration",
        "content": [
            "--------------UP",
            "SELECT 'up'",
            "--------------DOWN",
            "SELECT 'down'"
        ],
        "parsed": {
            "up": "SELECT 'up'",
            "down": "SELECT 'down'"
        },
        "migrated": true
    },
    {
        "baseName": "5_abc.sql",
        "path": "tests/unit/runtime/migration",
        "content": [
            "--------------UP",
            "SELECT 'up'",
            "--------------DOWN",
            "SELECT 'down'"
        ],
        "parsed": {
            "up": "SELECT 'up'",
            "down": "SELECT 'down'"
        },
        "migrated": true
    },
    {
        "baseName": "123_abc.sql",
        "path": "tests/unit/runtime/migration",
        "content": [
            "--------------UP",
            "SELECT 'up'",
            "--------------DOWN",
            "SELECT 'down'"
        ],
        "parsed": {
            "up": "SELECT 'up'",
            "down": "SELECT 'down'"
        },
        "migrated": true
    }
]
```
