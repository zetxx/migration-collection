# Migration collection

[![Build Status](https://travis-ci.com/zetxx/migration-collection.svg?branch=master)](https://travis-ci.com/zetxx/migration-collection)

Simple implementation of migration collection.

- `test.js` - example test, should return:

```js
[
    {
        "dir": "./mig_test/",
        "migrations": [
            {
                "up": "SELECT 'up'",
                "down": "SELECT 'down'",
                "id": "1_bca"
            },
            {
                "up": "SELECT 'up'",
                "down": "SELECT 'down'",
                "id": "123_abc"
            },
            {
                "up": "SELECT 'up'",
                "down": "SELECT 'down'",
                "id": "1234_abc"
            }
        ]
    }
]
```
