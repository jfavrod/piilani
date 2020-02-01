import appRoot from 'app-root-path';
import { readFileSync } from 'fs';
import { IConfig, IConfigValues } from '../interfaces';

import ConfigError from '../../errors/ConfigError';
import Config from '../Config';
import { Env } from '../enums';

export default class ConfigFactory {
    private static config: IConfig;
    private static devConfigFile = `${appRoot}/config/dev.config.json`;
    private static nonProdConfigFile = `${appRoot}/config/non-prod.config.json`;
    private static prodConfigFile = `${appRoot}/config/prod.config.json`;

    public static getInstance = (): IConfig => {
        let defaultConfigValues: Partial<IConfigValues>;

        if (ConfigFactory.config) {
            return ConfigFactory.config;
        }

        try {
            defaultConfigValues =
                JSON.parse(readFileSync(`${appRoot}/config/default.config.json`).toString()) as Partial<IConfigValues>;
        }
        catch (err) {
            throw new ConfigError(`Failed to read default config file. ${err.toString()}`);
        }

        if (process.env.PIILANI_ENV === Env.prod) {
            try {
                const config = Object.assign(defaultConfigValues,
                    JSON.parse(readFileSync(ConfigFactory.prodConfigFile).toString()) as Partial<IConfigValues>);

                return new Config(config, process.env.PIILANI_ENV);
            }
            catch (err) {
                throw new ConfigError(`Failed to read prod config file (${ConfigFactory.prodConfigFile}). ${err.toString()}`);
            }
        }
        else if (process.env.PIILANI_ENV === Env['non-prod']) {
            try {
                const config = Object.assign(defaultConfigValues,
                    JSON.parse(readFileSync(ConfigFactory.nonProdConfigFile).toString()) as Partial<IConfigValues>);

                return new Config(config, process.env.PIILANI_ENV);
            }
            catch (err) {
                throw new ConfigError(`Failed to read non-prod config file (${ConfigFactory.prodConfigFile}). ${err.toString()}`);
            }
        }
        else {
            try {
                const config = Object.assign(defaultConfigValues,
                    JSON.parse(readFileSync(ConfigFactory.devConfigFile).toString()) as Partial<IConfigValues>);
                return new Config(config, Env.dev);
            }
            catch (err) {
                throw new ConfigError(`Failed to read dev config file (${ConfigFactory.devConfigFile}). ${err.toString()}`);
            }
        }
    }
}
