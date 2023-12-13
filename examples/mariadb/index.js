(async() => {
    await require('../../lib/mariadb')(
        require('./example.config')
    );
})();