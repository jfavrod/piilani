import { ILogger } from '../context/interfaces';

export abstract class ServiceBase {
    public readonly className: string = this.constructor.name;
    protected logger: ILogger;

    public constructor(logger?: ILogger) {
        if (logger) {
            this.logger = logger;
        }
        else {
            this.logger = console as any as ILogger;
        }
    }
}

export default ServiceBase;
