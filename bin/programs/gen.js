const appRoot = require('app-root-path');
const Case = require('case');
const fs = require('fs');
const Helpers = require(appRoot + '/bin/Helpers');
const prompts = require('prompts');
const templates = appRoot + '/bin/templates';

const generateGateway = async () => {
    const models = Helpers.getModels();

    if (!models || !models.length) {
        console.log('No models found. Models are required for gateways.');
        process.exit(1);
    }

    console.error('generateGateway not implemented');
    process.exit(2);
};

const generateService = async () => {
    const models = Helpers.getModels();

    if (!models || !models.length) {
        console.log('No models found. Models are required for services.');
        process.exit(1);
    }

    const name = await prompts({
        message: "What's the service name?",
        name: 'value',
        type: 'text'
    });

    const model = await prompts({
        choices: models,
        message: 'Model to use?:',
        name: 'value',
        type: 'select'
    })

    const modelName = Helpers.getModels()[model.value].replace(/\.ts$/, '');

    const gateway = await prompts({
        choices: Helpers.getGateways(),
        message: 'Which gateway will the service use?:',
        name: 'value',
        type: 'select'
    })

    const serviceDir = appRoot + '/src/services/' + Case.pascal(name.value);
    const serviceName = Case.pascal(name.value) + 'Service';

    fs.mkdirSync(serviceDir);

    const serviceTemplate = fs.readFileSync(templates + '/services/Service.tmplt').toString();
    fs.writeFileSync(serviceDir + '/' + serviceName + '.ts',
        serviceTemplate
        .replace(/<MODEL>/g, modelName)
        .replace(/<SERVICE>/g, serviceName)
        .replace(/<GATEWAY>/g, Helpers.getGateways()[gateway.value])
    );
    delete serviceTemplate;

    const interfacesTemplate = fs.readFileSync(templates + '/services/interfaces.tmplt').toString();
    fs.writeFileSync(serviceDir + '/interfaces.ts',
        interfacesTemplate
        .replace(/<MODEL>/g, modelName)
        .replace(/<SERVICE>/g, serviceName)
    );
    delete interfacesTemplate;

    const routerTemplate = fs.readFileSync(templates + '/services/router.tmplt').toString();
    fs.writeFileSync(serviceDir + '/router.ts',
        routerTemplate
        .replace(/<ENDPOINT>/g, Case.kebab(modelName))
        .replace(/<MODEL>/g, modelName)
        .replace(/<SERVICE>/g, serviceName)
        .replace(/<GATEWAY>/g, Helpers.getGateways()[gateway.value])
    );
    delete routerTemplate;
}

module.exports = (program) => {
    program
    .command('gen <component>')
    .description('generate a <gateway> or <service> component')
    .action(async (component) => {
        let config;

        try {
            config = JSON.parse(fs.readFileSync(appRoot + '/config.json').toString());
        }
        catch (err) {
            console.log('Failed to find config.js in appRoot (' + appRoot + ').');
            console.log('Did you configure (capo configure)?')
            process.exit(1);
        }

        if (component.toLowerCase() === 'gateway') {
            generateGateway();
        }
        else if (component.toLowerCase() === 'service') {
            generateService();
        }
    });
};
