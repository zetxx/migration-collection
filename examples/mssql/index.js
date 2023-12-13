(async() => {
    await require('../../lib/mssql')(
        require('./example.config')
    );
})();