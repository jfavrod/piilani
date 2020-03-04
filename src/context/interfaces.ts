/**
 * @packageDocumentation
 * @module Context
 */

import { DBDriver } from './enums';

export interface IConfigValues {
    /** Supported Drivers: postgres (pg/node-postgres) */
    database?: IDatabaseVals | IMultiDatabaseVals;
    listenPort?: number;
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
    port?: number;
    ssl?: IDatabaseSSL;
    user: string;
}

export interface ILogger {
    log(level: string, mesg?: string): void;
}

export interface IMultiDatabaseVals {
    [key: string]: IDatabaseVals;
}

export interface IService {
    name: string;
    url: string;
}
