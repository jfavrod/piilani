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
 * @type {Model} Entity for datasource operations.
 */
export interface ITableDataGateway<Model> {
    /** The name of the table. */
    table: string;
    delete(query: Partial<Model>): Promise<IGatewayResponse>;
    find(query?: Partial<Model>): Promise<ITypedGatewayResponse<Model>>;
    insert(record: Model): Promise<IGatewayResponse>;
    update(record?: Model): Promise<IGatewayResponse>;
}
