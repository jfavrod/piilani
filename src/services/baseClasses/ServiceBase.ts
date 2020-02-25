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

    /**
     * Get a default IServiceResponse object.
     * @returns {IServiceResponse}
     * {
     *   "code": 500,
     *   "error": true,
     *   "message": "Default service response",
     * }
     */
    protected getDefaultServiceResponse = (): IServiceResponse => {
        return {
            code: 500,
            error: true,
            message: 'Default service response',
        };
    }
}
