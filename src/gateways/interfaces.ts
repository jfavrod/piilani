/**
 * Common interfaces for Gateways classes (Gateways).
 */

export interface IGatewayResponse {
    /**
     * Response classes:
     * 0) everything went A-Ok
     * 1) method executed successfully, but did not produce intended outcome
     * 2) method execution failed
     */
    class: number;
    data?: unknown;
    message?: string;
}

export interface ITypedGatewayResponse<T> extends IGatewayResponse {
    data: T[];
}

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
