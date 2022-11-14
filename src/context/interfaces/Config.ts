import { LoggerOptions } from 'winston';
import { DBDriver } from '../enums';
import { LogLevel } from './ILogger';

export interface IConfigValues {
    [index: string]: unknown;
    /** Supported Drivers: postgres (pg/node-postgres) */
    database?: IDatabaseValues | IMultiDatabaseVals;
    listenPort?: number;
    logging: ILoggingConfig;
    services?: { [key: string]: IService };
    ssl?: ISslConfig;
}

export interface ISslConfig {
    /** Path, relative to config directory, where ca file is located. */
    ca?: string;
    /** Path, relative to config directory, where cert file is located. */
    cert: string;
    /** Path, relative to config directory, where key file is located. */
    key: string;
}

export interface IDatabaseValues {
    driver: DBDriver;
    host: string;
    mongo: {
        useSrv?: boolean;
    };
    name: string;
    password: string;
    port: number;
    ssl?: ISslConfig;
    user: string;
}

export interface ILoggingConfig extends LoggerOptions {
    http?: {
        host: string;
        port: number;
    };
    noConsole: boolean;
    level: LogLevel;
}

export interface IMultiDatabaseVals {
    [key: string]: IDatabaseValues;
}

export interface IService {
    [index: string]: unknown;
    cert?: string;
    clientId?: string;
    clientSecret?: string;
    url?: string;
    urls?: {
        [index: string]: string;
    };
}
