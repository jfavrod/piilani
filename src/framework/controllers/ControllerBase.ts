import { ILogger } from '../../context'

export default abstract class ServiceBase {
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
