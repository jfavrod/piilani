import { DBDriver, Env } from './enums';

export interface IConfig {
    /**
     * Get a database connection string.
     * @param db If multiple databases configured, use db to select.
     */
    getConnectionString(db?: string): string;
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

export interface IDatabaseVals {
    driver: DBDriver;
    host: string;
    name: string;
    password: string;
    port?: number;
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
