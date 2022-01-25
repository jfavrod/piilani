/**
 * @packageDocumentation
 * @module Context
 */

import { Env } from '../enums';

import {
  IDatabaseVals,
  ILoggingConfig,
  IMultiDatabaseVals,
} from '../interfaces';

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
    getLoggingConfig(): ILoggingConfig | undefined;
    getServiceConfig(serviceName: string): {[key: string]: unknown} | undefined;
    getServiceUrl(service: string): string | undefined;
    toString(): string;
}
