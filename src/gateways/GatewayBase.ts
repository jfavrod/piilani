/* eslint-disable @typescript-eslint/no-unused-vars */
import { ILogger } from '../context/interfaces';
import { IGatewayResponse, ITableDataGateway, ITypedGatewayResponse } from './interfaces';

/**
 * @type {E} Entity for datasource operations.
 * @type {E} Query object for key/value pair searches.
 */
export default class GatewayBase<E, Q> implements ITableDataGateway<Q, E> {
    public readonly table: string;
    protected logger: ILogger;

    constructor(tablename: string, logger: ILogger) {
        this.table = tablename;
        this.logger = logger;
    }

    delete(query: Q): IGatewayResponse {
        throw new Error('Method not implemented.');
    }

    deleteAsync(query: Q): Promise<IGatewayResponse> {
        throw new Error('Method not implemented.');
    }

    find(query?: Q): ITypedGatewayResponse<E> {
        throw new Error('Method not implemented.');
    }

    findAsync(query?: Q): Promise<ITypedGatewayResponse<E>> {
        throw new Error('Method not implemented.');
    }

    insert(record: E): IGatewayResponse {
        throw new Error('Method not implemented.');
    }

    insertAsync(record: E): Promise<IGatewayResponse> {
        throw new Error('Method not implemented.');
    }

    update(record: E): IGatewayResponse {
        throw new Error('Method not implemented.');
    }

    updateAsync(record: E): Promise<IGatewayResponse> {
        throw new Error('Method not implemented.');
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
