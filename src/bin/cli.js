#!/usr/bin/env node
"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
var child_process_1 = require("child_process");
var app_root_path_1 = require("app-root-path");
var configDir = app_root_path_1["default"].path + "/config";
var defaultConfig = configDir + "/config.json";
var packageFile = app_root_path_1["default"].path + "/package.json";
var devDependencies = Object.freeze([
    '@types/node',
    '@types/app-root-path',
    'typescript'
]);
var prodDependencies = Object.freeze([
    'app-root-path',
    'reflect-metadata',
    'tsyringe',
    'winston',
    'winston-logger'
]);
var main = function () {
    if (getCommand() === 'init') {
        init();
    }
};
var getCommand = function () {
    if (process.argv.length === 3) {
        return process.argv[2];
    }
    return '';
};
var init = function () {
    makeConfigDir();
    makeDefaultConfig();
    makeEnvConfigs();
    installRequired();
};
var installRequired = function () {
    var installing = '';
    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        var pkgFile = JSON.parse((0, fs_1.readFileSync)(packageFile).toString());
        var prodDeps_1 = Object.keys(pkgFile.dependencies || {});
        var devDeps_1 = Object.keys(pkgFile.devDependencies || {});
        prodDependencies.forEach(function (prodDep) {
            if (!prodDeps_1.includes(prodDep)) {
                installing = prodDep;
                (0, child_process_1.execSync)("npm i " + prodDep);
            }
        });
        devDependencies.forEach(function (devDep) {
            if (!devDeps_1.includes(devDep)) {
                installing = devDep;
                (0, child_process_1.execSync)("npm i -D " + devDep);
            }
        });
    }
    catch (err) {
        // eslint-disable-next-line no-console
        console.error("installRequired: failed to install " + installing + ": " + err.message);
    }
};
var makeConfigDir = function () {
    try {
        if (!(0, fs_1.existsSync)(configDir)) {
            (0, fs_1.mkdirSync)(configDir);
        }
        else {
            // eslint-disable-next-line no-console
            console.warn("Config directory (" + configDir + ") already exists.");
        }
    }
    catch (err) {
        // eslint-disable-next-line no-console
        console.error("makeConfig: " + err.message);
    }
};
var makeDefaultConfig = function () {
    try {
        var configTemplate = (0, fs_1.readFileSync)(__dirname + "/templates/config.json");
        if (!(0, fs_1.existsSync)(defaultConfig)) {
            (0, fs_1.writeFileSync)(defaultConfig, configTemplate);
        }
        else {
            // eslint-disable-next-line no-console
            console.warn("Default config (" + defaultConfig + ") already exists; leaving alone.");
        }
    }
    catch (err) {
        // eslint-disable-next-line no-console
        console.error("makeDefaultConfig: " + err.message);
    }
};
var makeEnvConfigs = function () {
    ['dev.config.json', 'non-prod.config.json', 'prod.config.json']
        .forEach(function (configFile) {
        try {
            var configPath = configDir + "/" + configFile;
            if (!(0, fs_1.existsSync)(configPath)) {
                (0, fs_1.writeFileSync)(configPath, '{}');
            }
            else {
                // eslint-disable-next-line no-console
                console.warn("Config (" + configPath + ") already exists; leaving alone.");
            }
        }
        catch (err) {
            // eslint-disable-next-line no-console
            console.error("makeEnvConfigs: error on " + configFile + ": " + err.message);
        }
    });
};
main();
