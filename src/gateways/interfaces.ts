/**
 * Common interfaces for Gateways classes (Gateways).
 */

export interface IGatewayResponse {
    /**
     * Response classes:
     * 1) everything went A-Ok
     * 2) method executed successfully, but did not produce intended outcome
     * 3) method execution failed
     */
    class: 1 | 2 | 3;
    data?: unknown;
    message?: string;
}

export interface ITypedGatewayResponse<T> extends IGatewayResponse {
    data?: T[];
}

/**
 * @type {Query} Query object for key/value pair searches.
 * @type {Model} Entity for datasource operations.
 */
export interface ITableDataGateway<Query, Model> {
    /** The name of the table. */
    table: string;
    delete(query: Query): IGatewayResponse;
    deleteAsync(query: Query): Promise<IGatewayResponse>;
    find(query?: Query): ITypedGatewayResponse<Model>;
    findAsync(query?: Query): Promise<ITypedGatewayResponse<Model>>;
    insert(record: Model): IGatewayResponse;
    insertAsync(record: Model): Promise<IGatewayResponse>;
    update(record?: Model): IGatewayResponse;
    updateAsync(record?: Model): Promise<IGatewayResponse>;
}
