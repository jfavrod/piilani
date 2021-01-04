/**
 * @packageDocumentation
 * @module Context.Factories
 */

import { createLogger, format, transports } from 'winston';
import * as Transport from 'winston-transport';
import { IConfig } from '../Config/interfaces';
import { ILogger } from '../interfaces';

import ConfigFactory from './ConfigFactory';

/**
 * Instantiates ILogger objects.
 *
 * @example ```typescript
 * import LoggerFactory from './context/factories/LoggerFactory';
 *
 * const logger = LoggerFactory.getInstance();
 * logger.log('error', 'My error message');
 * ```
 */
export default class LoggerFactory {
    private static config: IConfig | undefined;
    private static logger: ILogger | undefined;

    public static getInstance = (): ILogger => {
        if (!LoggerFactory.config) {
            LoggerFactory.config = ConfigFactory.getInstance();
        }

        if (LoggerFactory.logger) {
            const loggingConfig = LoggerFactory.config.getLoggingConfig();

            if (loggingConfig) {
                loggingConfig.format = format.json();

                loggingConfig.transports = [] as Transport[];

                if (!loggingConfig?.noConsole) {
                    loggingConfig.transports.push(new transports.Console());
                }

                if (loggingConfig.http) {
                    loggingConfig.transports.push(
                        new transports.Http({
                            host: loggingConfig.http.host,
                            port: loggingConfig.http.port,
                        }),
                    );
                }

                LoggerFactory.logger = createLogger(loggingConfig);
            }

            return LoggerFactory.logger;
        }
        else {
            return console;
        }
    };
}

