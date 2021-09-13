/**
 * @packageDocumentation
 * @module Gateways
 */

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
    data?: any;
    message?: string;
}

export interface ITableDataGateway {
    /** The name of the table. */
    table: string;
    delete(query: any): IGatewayResponse;
    deleteAsync(query: any): Promise<IGatewayResponse>;
    find(query?: any): IGatewayResponse;
    findAsync(query?: any): Promise<IGatewayResponse>;
    insert(record: any): IGatewayResponse;
    insertAsync(record: any): Promise<IGatewayResponse>;
    update(record?: any): IGatewayResponse;
    updateAsync(id: any, record?: any): Promise<IGatewayResponse>;
}
