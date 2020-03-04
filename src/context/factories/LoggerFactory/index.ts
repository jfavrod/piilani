/**
 * @packageDocumentation
 * @module Context.Factories
 */

import { ILogger } from '../../interfaces';

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
    public static getInstance(): ILogger {
        return console;
    }
}
