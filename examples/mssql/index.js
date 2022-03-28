(async() => {
    await require('../../lib/mssql')(
        require('./config')
    );
})();