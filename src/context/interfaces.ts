/**
 * @packageDocumentation
 * @module Context
 */

import { LoggerOptions } from 'winston';
import { DBDriver, LogDriver } from './enums';

export interface IConfigValues {
    [index: string]: any;
    /** Supported Drivers: postgres (pg/node-postgres) */
    database?: IDatabaseVals | IMultiDatabaseVals;
    listenPort?: number;
    logging: ILoggingConfig;
    services?: { [key: string]: IService };
}

export interface IDatabaseSSL {
    /** Path, relative to config directory, where ca file is located. */
    ca?: string;
    /** Path, relative to config directory, where cert file is located. */
    cert?: string;
    /** Path, relative to config directory, where key file is located. */
    key?: string;
}

export interface IDatabaseVals {
    driver: DBDriver;
    host: string;
    name: string;
    password: string;
    port: number;
    ssl?: IDatabaseSSL;
    user: string;
}

export type LogLevel = 'debug' | 'error' | 'fatal' | 'info' | 'warn';
export interface ILogger {
    debug(mesg?: string): void;
    error(mesg?: string): void;
    info(mesg?: string): void;
    log(level: LogLevel, mesg?: string): void;
    warn(mesg?: string): void;
}

export interface ILoggingConfig extends LoggerOptions {
    [index: string]: any;
    driver: LogDriver;
    http?: {
        host: string;
        port: number;
    };
    level: string;
}

export interface IMultiDatabaseVals {
    [key: string]: IDatabaseVals;
}

export interface IService {
    [index: string]: any;
    cert?: string;
    clientId?: string;
    clientSecret?: string;
    url?: string;
    urls?: {
        [index: string]: string;
    };
}
