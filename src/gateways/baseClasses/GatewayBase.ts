import { ILogger } from '../../context/interfaces';
import { IGatewayResponse } from '../interfaces';

export default class GatewayBase {
    protected logger: ILogger;

    constructor(logger?: ILogger) {
        if (logger) {
            this.logger = logger;
        }
        else {
            this.logger = console;
        }
    }

    /**
     * Get a default IGatewayResponse object.
     * @returns {IGatewayResponse} { class: 2, message: 'default response' }
     */
    protected getDefaultResponse = (): IGatewayResponse => {
        return {
            class: 2,
            message: 'default response',
        };
    }
}
