# Migration collection

[![Build Status](https://travis-ci.com/zetxx/migration-collection.svg?branch=master)](https://travis-ci.com/zetxx/migration-collection)

Simple implementation of migration collection.

- `examples/1.js` - example , should return:

```js
{
    "dir": "tests/unit/runtime/migration_dir",
    "list": [
        {
            "baseName": "1_bca.sql",
            "path": "tests/unit/runtime/migration_dir",
            "content": [
                "--------------UP",
                "SELECT 'up'",
                "--------------DOWN",
                "SELECT 'down'"
            ],
            "parsed": {
                "up": "SELECT 'up'",
                "down": "SELECT 'down'"
            }
        },
        {
            "baseName": "2_abc.sql",
            "path": "tests/unit/runtime/migration_dir",
            "content": [
                "--------------UP",
                "SELECT 'up'",
                "--------------DOWN",
                "SELECT 'down'"
            ],
            "parsed": {
                "up": "SELECT 'up'",
                "down": "SELECT 'down'"
            }
        },
        {
            "baseName": "5_abc.sql",
            "path": "tests/unit/runtime/migration_dir",
            "content": [
                "--------------UP",
                "SELECT 'up'",
                "--------------DOWN",
                "SELECT 'down'"
            ],
            "parsed": {
                "up": "SELECT 'up'",
                "down": "SELECT 'down'"
            }
        },
        {
            "baseName": "123_abc.sql",
            "path": "tests/unit/runtime/migration_dir",
            "content": [
                "--------------UP",
                "SELECT 'up'",
                "--------------DOWN",
                "SELECT 'down'"
            ],
            "parsed": {
                "up": "SELECT 'up'",
                "down": "SELECT 'down'"
            }
        }
    ]
}
```
