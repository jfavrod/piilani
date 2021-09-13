const { existsSync } = require('fs');

const templates = {
    restapi: require('./restapi'),
}

module.exports = {
    getTemplate: (name) => {
        if (existsSync(`${__dirname}/${name}.js`)) {
            try {
                const template = require(`${__dirname}/${name}`);
                return template;
            }
            catch (err) {
                console.log('failed to retrieve template', err);
            }
        }
        else {
            console.log('failed to find template');
        }
    },

    listTemplates: () => {
        for (const name in templates) {
            console.log(name)
        }
    },

    processTemplate: (template) => {
        if (template.dirs && template.dirs instanceof Array) {
            template.dirs.forEach((dir) => {
                if (!existsSync(dir)) {
                    console.log('create directory', dir)
                }
            })
        }
    }
};
