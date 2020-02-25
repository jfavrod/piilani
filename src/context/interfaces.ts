import { DBDriver, Env } from './enums';

export interface IConfig {
    /** Get absolute path to the config directory. */
    getConfigDir(): string;
    /**
     * Get a database connection string.
     * @param db If multiple databases configured, use db to select.
     */
    getConnectionString(db?: string): string;
    getDatabaseConfig(): IDatabaseVals | IMultiDatabaseVals | undefined;
    getEnv(): Env;
    getListenPort(): number | undefined;
    getServiceConfig(serviceName: string): {[key: string]: any} | undefined;
    getServiceUrl(service: string): string | undefined;
    toString(): string;
}

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
