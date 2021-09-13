const approot = require('app-root-path')
const { readFileSync } = require('fs')

module.exports = {
    'dirs': [
        `${approot.path}/src/controllers`
    ],
    'files': [
        {
            path: `${approot.path}/src/index.ts`,
            text: readFileSync(__dirname + '/restapi-index.tmplt').toString()
        },
        {
            path: `${approot.path}/src/controllers/DefaultRestController.ts`,
            text: readFileSync(__dirname + '/controllers/DefaultRestController.tmplt').toString()
        },
    ],
};
