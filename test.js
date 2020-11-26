const m = require('./index');
(async() => {
    const coll = await m({directories: ['./mig_test/']});
    console.log(JSON.stringify(coll, null, 4));
})();