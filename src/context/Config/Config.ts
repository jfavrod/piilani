import { injectable } from 'tsyringe';

import { DBDriver, Env } from '../enums';

import {
  IConfigValues,
  IDatabaseValues,
  ILoggingConfig,
  IMultiDatabaseVals,
  IService,
} from '../interfaces';

import { IConfig } from './interfaces';

@injectable()
export default class Config implements IConfig {
  private configDir: string;
  private configValues: IConfigValues;
  private env: Env;

  /**
   * @param configValues Values used to configure this application.
   * Should be a JSON file in the configDir.
   * @param env The Env this application is running in.
   * @param configDir The absolute path to the config directory - the
   * directory where the config is stored.
   */
  public constructor(configValues: IConfigValues, env: Env, configDir: string) {
    this.configDir = configDir;
    this.configValues = configValues;
    this.env = env;
  }

  public getConfigDir = (): string => {
    return this.configDir;
  };

  public getConnectionString = (db?: string): string => {
    let connString = '';
    let dbVals: IDatabaseValues;

    if (db) {
      dbVals = (this.configValues.database as IMultiDatabaseVals)[db];
    }
    else {
      dbVals = this.configValues.database as IDatabaseValues;
    }

    switch (this.configValues.database?.driver) {
      case DBDriver.mongodb:
        connString = this.getMongoString(dbVals);
        break;
      case DBDriver.postgres:
        connString = this.getPostgresString(dbVals);
        break;
    }

    if (this.configValues.database?.driver === DBDriver.postgres) {
      connString = this.getPostgresString(dbVals);
    }

    return connString;
  };

  /**
   * Get a copy of the database configuration.
   */
  public getDatabaseConfig = (): IDatabaseValues | IMultiDatabaseVals => {
    return Object.assign({}, this.configValues.database);
  };

  /**
   * Get the currently running Env.
   */
  public getEnv = (): Env => {
    return this.env;
  };

  /**
   * If running as a service, the port the service is supposed to
   * listen on.
   */
  public getListenPort = (): number | undefined => {
    return this.configValues.listenPort || 3000;
  };

  /**
   * Get a copy of the logging configuration.
   */
  public getLoggingConfig = (): ILoggingConfig => {
    return Object.assign({}, this.configValues.logging);
  };

  public getServerConfig = (): { port: number; ssl?: { cert: string; key: string; } | undefined; } => {
    return {
      port: this.configValues.listenPort || 3000,
      ssl: this.configValues.ssl,
    };
  };

  public getServiceConfig = (serviceName: string): IService | undefined => {
    if (this.configValues.services && Object.keys(this.configValues.services).includes(serviceName)) {
      return this.configValues.services[serviceName];
    }
  };

  /**
   * Retrieve a list of the configured services.
   */
  public getServiceList = (): string[] => {
    const services: string[] = [];

    for (const service in this.configValues.services) {
      if (this.configValues.services[service]) {
        services.push(service);
      }
    }

    return services;
  };

  public getServiceUrl = (serviceName: string): string | undefined => {
    if (this.configValues.services
            && Object.keys(this.configValues.services).includes(serviceName)
            && this.configValues.services[serviceName].url) {
      return this.configValues.services[serviceName].url;
    }
  };

  public toString(): string {
    return JSON.stringify(this.configValues, null, 2);
  }

  private getMongoString = (values: IDatabaseValues): string => {
    let connString = values.host.toLowerCase() === 'localhost'
      ? 'mongodb://'
      : 'mongodb+srv://';
    connString += values.user;
    connString += `:${values.password}`;
    connString += `@${values.host}`;
    return connString;
  };

  /**
   * @param values
   * @returns
   */
  private getPostgresString = (values: IDatabaseValues): string => {
    let connString = 'postgresql://';
    connString += values.user;
    connString += `:${values.password}`;
    connString += `@${values.host}`;
    connString += `:${values.port}`;
    connString += `/${values.name}`;
    return connString;
  };
}
