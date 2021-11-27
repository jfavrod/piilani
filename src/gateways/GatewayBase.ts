import { ILogger } from '../context/interfaces';
import { IGatewayResponse, ITableDataGateway } from './interfaces';

/**
 * @type {E} Entity for datasource operations.
 * @type {Q} Query object for key/value pair searches.
 */
export default class GatewayBase<E, Q> implements ITableDataGateway {
    public readonly className = this.constructor.name;
    public readonly table: string;
    protected logger: ILogger;

    constructor(tablename: string, logger: ILogger) {
        this.table = tablename;
        this.logger = logger;
    }

    delete(query: Q): IGatewayResponse<any> {
        throw new Error('Method not implemented.');
    }

    deleteAsync(query: Q): Promise<IGatewayResponse<any>> {
        throw new Error('Method not implemented.');
    }

    find(query?: Q): IGatewayResponse<any> {
        throw new Error('Method not implemented.');
    }

    findAsync(query?: Q): Promise<IGatewayResponse<any>> {
        throw new Error('Method not implemented.');
    }

    insert(record: E): IGatewayResponse<any> {
        throw new Error('Method not implemented.');
    }

    insertAsync(record: E): Promise<IGatewayResponse<any>> {
        throw new Error('Method not implemented.');
    }

    update(record: E): IGatewayResponse<any> {
        throw new Error('Method not implemented.');
    }

    updateAsync(record: E): Promise<IGatewayResponse<any>> {
        throw new Error('Method not implemented.');
    }

    /**
     * Get a default IGatewayResponse object.
     * @returns {IGatewayResponse} { class: 2, message: 'default response' }
     */
    protected getDefaultResponse = (): IGatewayResponse<any> => {
        return {
            class: 2,
            message: 'default response',
        };
    }
}
