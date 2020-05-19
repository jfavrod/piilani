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
    delete(query: any): Promise<IGatewayResponse>;
    find(query?: any): Promise<IGatewayResponse>;
    insert(record: any): Promise<IGatewayResponse>;
    update(id: any, record?: any): Promise<IGatewayResponse>;
}
