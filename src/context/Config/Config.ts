/**
 * @packageDocumentation
 * @module Context
 */

import appRoot from 'app-root-path';
import { DBDriver, Env } from '../enums';

import {
    IConfigValues,
    IDatabaseVals,
    IFirebaseSettings,
    ILoggingConfig,
    IMultiDatabaseVals,
    IService,
} from '../interfaces';

import { IConfig } from './interfaces';

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

        this.getConfigDir = this.getConfigDir.bind(this);
        this.getConnectionString = this.getConnectionString.bind(this);
        this.getDatabaseConfig = this.getDatabaseConfig.bind(this);
        this.getEnv = this.getEnv.bind(this);
        this.getListenPort = this.getListenPort.bind(this);
        this.getLoggingConfig = this.getLoggingConfig.bind(this);
        this.getServiceConfig = this.getServiceConfig.bind(this);
        this.getServiceUrl = this.getServiceUrl.bind(this);
        this.toString = this.toString.bind(this);
    }

    public getConfigDir(): string {
        return this.configDir;
    }

    public getConnectionString(db?: string): string {
        let connString: string;

        if (db) {
            return (this.configValues.database as IMultiDatabaseVals)[db].toString();
        }
        else {
            if (this.configValues.database?.driver === DBDriver.pg) {
                const dbVals = this.configValues.database as IDatabaseVals;
                connString = 'postgresql://';
                connString += this.configValues.database.user;
                connString += `: ${dbVals.password}`;
                connString += `@ ${dbVals.host}`;
                connString += `: ${dbVals.port}`;
                connString += `/ ${dbVals.name}`;
                return connString;
            }

            return (this.configValues.database as IDatabaseVals).toString();
        }
    }

    /**
     * Get a copy of the database configuration.
     */
    public getDatabaseConfig(): IDatabaseVals | IMultiDatabaseVals {
        return Object.assign({}, this.configValues.database);
    }

    /**
     * Get the currently running Env.
     */
    public getEnv(): Env {
        return this.env;
    }

    public getFirestoreConfig(): IFirebaseSettings | undefined {
        const config = this.configValues.firestore;

        if (config) {
            config.keyFilename = `${appRoot.path}/config/${config.keyFilename}`;
        }

        return config;
    }

    /**
     * If running as a service, the port the service is supposed to
     * listen on.
     */
    public getListenPort(): number | undefined {
        return this.configValues.listenPort;
    }

    /**
     * Get a copy of the logging configuration.
     */
    public getLoggingConfig(): ILoggingConfig {
        return Object.assign({}, this.configValues.logging);
    }

    public getServiceConfig(serviceName: string): IService | undefined {
        if (this.configValues.services && Object.keys(this.configValues.services).includes(serviceName)) {
            return this.configValues.services[serviceName];
        }
    }

    /**
     * Retrieve a list of the configured services.
     */
    public getServiceList(): string[] {
        const services: string[] = [];

        for (const service in this.configValues.services) {
            if (this.configValues.services.hasOwnProperty(service)) {
                services.push(service);
            }
        }

        return services;
    }

    public getServiceUrl(serviceName: string): string | undefined {
        if (this.configValues.services
            && Object.keys(this.configValues.services).includes(serviceName)
            && this.configValues.services[serviceName].url) {
            return this.configValues.services[serviceName].url;
        }
    }

    public toString(): string {
        return JSON.stringify(this.configValues, null, 2);
    }
}
