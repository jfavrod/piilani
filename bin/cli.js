#!/usr/bin/env node
const appRoot = require('app-root-path');
const configure = require(appRoot + '/bin/programs/configure');
const gen = require(appRoot + '/bin/programs/gen');
const package = require('../package.json');
const program = require('commander');
const readline = require('readline');

// Shutdown when Ctrl+C pressed.
readline.createInterface({
  input: process.stdin,
  output: process.stdout
}).on('SIGINT', () => process.emit('SIGINT'));

process.on('SIGINT', () => {
  console.log('\nprocess terminated!');
  process.exit(2);
});

// Set program version.
program.version(package.version);

// Load programs.
configure(program);
gen(program);

program.parse(process.argv);
