/**
 * Common interfaces for Gateways classes (Gateways).
 */

export interface IGatewayResponse<Data> {
    /**
     * Response classes:
     * 0) everything went A-Ok
     * 1) method executed successfully, but did not produce intended outcome
     * 2) method execution failed
     */
    class: number;
    data?: Data[];
    message?: string;
}

export interface ITableDataGateway {
    /** The name of the table. */
    table: string;
    delete(query: any): IGatewayResponse<unknown>;
    deleteAsync(query: any): Promise<IGatewayResponse<unknown>>;
    find(query?: any): IGatewayResponse<unknown>;
    findAsync(query?: any): Promise<IGatewayResponse<unknown>>;
    insert(record: any): IGatewayResponse<unknown>;
    insertAsync(record: any): Promise<IGatewayResponse<unknown>>;
    update(record?: any): IGatewayResponse<unknown>;
    updateAsync(id: any, record?: any): Promise<IGatewayResponse<unknown>>;
}
