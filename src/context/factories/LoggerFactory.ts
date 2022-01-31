/**
 * @packageDocumentation
 * @module Context.Factories
 */

import { createLogger, format, transports } from 'winston';
import * as Transport from 'winston-transport';
import { IConfig, ILogger } from '..';

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
  private static config: IConfig;
  private static logger: ILogger;

  public static getInstance = (): ILogger => {
    if (!LoggerFactory.config) {
      LoggerFactory.config = ConfigFactory.getInstance();
    }

    if (!LoggerFactory.logger) {
      const loggingFormat = format.printf(({ level, message, timestamp }) => {
        return `${timestamp} [${level}]: ${message}`;
      });

      const loggingConfig = LoggerFactory.config.getLoggingConfig();

      if (loggingConfig) {
        loggingConfig.format = format.combine(
          format.timestamp(),
          loggingFormat
        );

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
      else {
        LoggerFactory.logger = console;
      }
    }

    return LoggerFactory.logger;
  };
}

