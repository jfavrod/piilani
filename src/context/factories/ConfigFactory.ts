import appRoot from 'app-root-path';
import { readFileSync } from 'fs';

import { IConfig, IConfigValues } from '../interfaces';

import ConfigError from '../../errors/ConfigError';
import Config from '../Config';
import { Env } from '../enums';

export default class ConfigFactory {
    private static config: IConfig;
    private static configDir: string;
    private static defaultConfigFile: string;
    private static devConfigFile: string;
    private static nonProdConfigFile: string;
    private static prodConfigFile: string;

    public static getInstance = (): IConfig => {
        let defaultConfigValues: Partial<IConfigValues>;

        if (ConfigFactory.config) {
            return ConfigFactory.config;
        }

        // If running in Cloud Foundry...
        // configDir must be set differently due Cloud Foundry environment.
        if (new RegExp('/home/vcap/app').test(appRoot.path)) {
            ConfigFactory.configDir = '/home/vcap/app/config';
        }
        else {
            ConfigFactory.configDir = `${appRoot}/config`;
        }

        ConfigFactory.defaultConfigFile = `${ConfigFactory.configDir}/default.config.json`;
        ConfigFactory.devConfigFile = `${ConfigFactory.configDir}/dev.config.json`;
        ConfigFactory.nonProdConfigFile = `${ConfigFactory.configDir}/non-prod.config.json`;
        ConfigFactory.prodConfigFile = `${ConfigFactory.configDir}/prod.config.json`;

        try {
            defaultConfigValues =
                JSON.parse(readFileSync(ConfigFactory.defaultConfigFile).toString()) as Partial<IConfigValues>;
        }
        catch (err) {
            throw new ConfigError(`Failed to read default config file. ${err.toString()}`);
        }

        if (process.env.PIILANI_ENV === Env.prod) {
            try {
                const config = Object.assign(defaultConfigValues,
                    JSON.parse(readFileSync(ConfigFactory.prodConfigFile).toString()) as IConfigValues);

                return new Config(config, process.env.PIILANI_ENV, ConfigFactory.configDir);
            }
            catch (err) {
                throw new ConfigError(`Failed to read prod config file (${ConfigFactory.prodConfigFile}). ${err.toString()}`);
            }
        }
        else if (process.env.PIILANI_ENV === Env['non-prod']) {
            try {
                const config = Object.assign(defaultConfigValues,
                    JSON.parse(readFileSync(ConfigFactory.nonProdConfigFile).toString()) as IConfigValues);

                return new Config(config, process.env.PIILANI_ENV, ConfigFactory.configDir);
            }
            catch (err) {
                throw new ConfigError(`Failed to read non-prod config file (${ConfigFactory.prodConfigFile}). ${err.toString()}`);
            }
        }
        else {
            try {
                const config = Object.assign(defaultConfigValues,
                    JSON.parse(readFileSync(ConfigFactory.devConfigFile).toString()) as IConfigValues);
                return new Config(config, Env.dev, ConfigFactory.configDir);
            }
            catch (err) {
                throw new ConfigError(`Failed to read dev config file (${ConfigFactory.devConfigFile}). ${err.toString()}`);
            }
        }
    }
}
