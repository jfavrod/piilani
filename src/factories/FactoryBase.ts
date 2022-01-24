/**
 * @packageDocumentation
 * @module Context.Factories.BaseClasses
 */

import { IConfig, ILogger } from '../context';
import ConfigFactory from './ConfigFactory';
import LoggerFactory from './LoggerFactory';

/**
 * A base class for creating new factories.
 *
 * @example ```typescript
 * import FactoryBase from './context/factories/baseClasses/FactoryBase';
 *
 * export default MyNewFactory extends FactoryBase {
 *     ...
 * }
 * ```
 */
export default abstract class FactoryBase {
    protected cachedConfig: IConfig | undefined;
    protected cachedLogger: ILogger | undefined;

    protected get config(): IConfig {
        if (!this.cachedConfig) {
            this.cachedConfig = ConfigFactory.getInstance();
        }

        return this.cachedConfig;
    }

    protected get logger(): ILogger {
        if (!this.cachedLogger) {
            this.cachedLogger = LoggerFactory.getInstance();
        }

        return this.cachedLogger;
    }
}
