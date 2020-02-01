import { ILogger } from '../../context/interfaces';

export default abstract class ServiceBase {
    protected logger: ILogger;

    constructor(logger?: ILogger) {
        if (logger) {
            this.logger = logger;
        }
        else {
            this.logger = console as any as ILogger;
        }
    }
}
