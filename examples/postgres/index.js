(async() => {
    await require('../../lib/postgres')(
        require('./config')
    );
})();
