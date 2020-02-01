const appRoot = require('app-root-path');
const fs = require('fs');

module.exports = {
    getGateways: function() {
        return (
            fs.readdirSync(appRoot + '/src/gateways', { withFileTypes: true })
              .filter(dirent => dirent.isDirectory())
              .map(dirent => dirent.name)
        );
    },
    getModels: function() {
        let models = [];
        try {
            models = fs.readdirSync(appRoot + '/src/models', { withFileTypes: true })
                .filter(dirent => !dirent.isDirectory() || dirent.name === 'interfaces.ts')
                .map(dirent => dirent.name)
        }
        catch (err) {
            console.log('Failed to getModels');
        }

        return models;
    }
};
