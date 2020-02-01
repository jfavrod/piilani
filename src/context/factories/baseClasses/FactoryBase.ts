import { IConfig, ILogger } from '../../interfaces';
import ConfigFactory from '../ConfigFactory';
import LoggerFactory from '../LoggerFactory';

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
