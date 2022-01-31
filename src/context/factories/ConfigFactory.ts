import { readFileSync } from 'fs';
import appRoot from 'app-root-path';

import { IConfig } from '../Config';
import { IConfigValues } from '../interfaces';

import ConfigError from '../../errors/ConfigError';
import Config from '../Config';
import { Env } from '..';

/**
 * Constructs an `Config` object based on the application's
 * configuration and current environment.
 *
 * @example ```typescript
 * import ConfigFactory from './context/factories/ConfigFactory';
 *
 * const config = ConfigFactory.getInstance();
 * config.getDatabaseConfig();
 * ```
 */
export default class ConfigFactory {
  private static config: Config;
  private static configDir: string;
  private static defaultConfigFile: string;
  private static devConfigFile: string;
  private static nonProdConfigFile: string;
  private static prodConfigFile: string;

  public static getInstance = (): IConfig => {
    let defaultConfigValues: Partial<IConfigValues> = {};

    if (ConfigFactory.config) {
      return ConfigFactory.config;
    }

    // If running in Cloud Foundry...
    // configDir must be set differently due Cloud Foundry environment.
    if (new RegExp('/home/vcap/app').test(appRoot.path)) {
      ConfigFactory.configDir = '/home/vcap/app/config';
    }
    else {
      ConfigFactory.configDir = `${appRoot.path}/config`;
    }

    ConfigFactory.defaultConfigFile = `${ConfigFactory.configDir}/config.json`;
    ConfigFactory.devConfigFile = `${ConfigFactory.configDir}/dev.config.json`;
    ConfigFactory.nonProdConfigFile = `${ConfigFactory.configDir}/non-prod.config.json`;
    ConfigFactory.prodConfigFile = `${ConfigFactory.configDir}/prod.config.json`;

    try {
      defaultConfigValues =
                JSON.parse(readFileSync(ConfigFactory.defaultConfigFile).toString()) as Partial<IConfigValues> || {};
    }
    catch ({ message }) {
      // eslint-disable-next-line no-console
      console.error(`Failed to read default config file. ${message as string}`);
      process.exit(1);
    }

    if (process.env.PIILANI_ENV === Env.prod) {
      try {
        const config = Object.assign(defaultConfigValues,
                    JSON.parse(readFileSync(ConfigFactory.prodConfigFile).toString()) as IConfigValues);

        return new Config(config, process.env.PIILANI_ENV, ConfigFactory.configDir);
      }
      catch (err) {
        throw new ConfigError(
          `Failed to read prod config file (${ConfigFactory.prodConfigFile}). ${(err as Error).message}`
        );
      }
    }
    else if (process.env.PIILANI_ENV === Env['non-prod']) {
      try {
        const config = Object.assign(defaultConfigValues,
                    JSON.parse(readFileSync(ConfigFactory.nonProdConfigFile).toString()) as IConfigValues);

        return new Config(config, process.env.PIILANI_ENV, ConfigFactory.configDir);
      }
      catch (err) {
        throw new ConfigError(
          `Failed to read non-prod config file (${ConfigFactory.prodConfigFile}). ${(err as Error).message}`
        );
      }
    }
    else {
      try {
        const config = Object.assign(defaultConfigValues,
                    JSON.parse(readFileSync(ConfigFactory.devConfigFile).toString()) as IConfigValues);
        return new Config(config, Env.dev, ConfigFactory.configDir);
      }
      catch (err) {
        // eslint-disable-next-line no-console
        console.error(
          `Failed to read dev config file (${ConfigFactory.devConfigFile}). ${(err as Error).message}`
        );
        return {} as IConfig;
      }
    }
  };
}
