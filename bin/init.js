const { program } = require('commander')
const templates = require('./templates')

console.log('program ', program)

program
    .command('new <template>')
    .description('Initialize a new app based on <template>.')
    .action((template) => {
        const templatePayload = templates.getTemplate(template)
        if (templatePayload) templates.processTemplate(templatePayload);
    })

program
    .command('list')
    .description('List app templates.')
    .action(templates.listTemplates)

program.parse(process.argv)
