(async() => {
    await require('../../lib/mariadb')(
        require('./config')
    );
})();