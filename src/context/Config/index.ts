/**
 * @packageDocumentation
 * @module Context
 */

import { DBDriver, Env } from '../enums';
import { IConfigValues, IDatabaseVals, IMultiDatabaseVals } from '../interfaces';

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
    constructor(configValues: IConfigValues, env: Env, configDir: string) {
        this.configDir = configDir;
        this.configValues = configValues;
        this.env = env;
    }

    public getConfigDir = (): string => {
        return this.configDir;
    }

    public getConnectionString = (db?: string) => {
        let connString: string;

        if (db) {
            return (this.configValues.database as IMultiDatabaseVals)[db].toString();
        }
        else {
            if (this.configValues.database?.driver === DBDriver.pg) {
                connString = 'postgresql://';
                connString += this.configValues.database.user;
                connString += ':' + this.configValues.database.password;
                connString += '@' + this.configValues.database.host;
                connString += ':' + this.configValues.database.port || '5432';
                connString += '/' + this.configValues.database.name;
                return connString;
            }

            return (this.configValues.database as IDatabaseVals).toString();
        }
    }

    public getDatabaseConfig = () => {
        return this.configValues.database;
    }

    public getEnv = () => {
        return this.env;
    }

    public getListenPort = () => {
        return this.configValues.listenPort;
    }

    public getServiceConfig = (serviceName: string) => {
        if (this.configValues.services && Object.keys(this.configValues.services).includes(serviceName)) {
            return this.configValues.services[serviceName];
        }
    }

    public getServiceUrl = (serviceName: string): string | undefined => {
        if (this.configValues.services
            && Object.keys(this.configValues.services).includes(serviceName)
            && this.configValues.services[serviceName].url) {
            return this.configValues.services[serviceName].url;
        }
    }

    public toString = () => {
        return JSON.stringify(this.configValues, null, 2);
    }
}
