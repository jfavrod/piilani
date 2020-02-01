const appRoot = require('app-root-path');
const fs = require('fs');
const prompts = require('prompts');

module.exports = (program) => {
    program
    .command('configure')
    .description('(re)configure the application')
    .action(async () => {
        console.log('configuring...');

        const database = await prompts({
            choices: [
                { title: 'mysql', value: 'mysql' },
                { title: 'postgresql', value: 'postgresql' },
                { title: 'sql server', value: 'sql-server' }
            ],
            initial: 'postgresql',
            message: 'Which database are you using?',
            name: 'value',
            type: 'autocomplete'
        });

        if (database.value.toLowerCase() !== 'postgresql') {
            console.log('Sorry, ' + database.value + ' database is not currently supported');
            process.exit(1);
        }

        const serviceFramework = await prompts({
            choices: [
                { title: 'express', value: 'express' },
                { title: 'hapi', value: 'hapi' },
                { title: 'koa', value: 'koa' }
            ],
            initial: 'express',
            message: 'Which framework would you like to use for services?',
            name: 'value',
            type: 'autocomplete'
        });

        if (serviceFramework.value.toLowerCase() !== 'express') {
            console.log('Sorry, ' + serviceFramework.value + ' framework is not currently supported');
            process.exit(1);
        }

        try {
            fs.writeFileSync(appRoot + '/config.json', JSON.stringify({
                "database": database.value,
                "services": serviceFramework.value
            }, null, 2));
        }
        catch (err) {
            console.log('Failed to create config.json in appRoot (' + appRoot + ').')
            process.exit(1);
        }
    });
};
