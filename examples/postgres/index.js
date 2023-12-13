(async() => {
    await require('../../lib/postgres')(
        require('./example.config')
    );
})();
