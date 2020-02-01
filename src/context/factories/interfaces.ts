import { ITableDataGateway } from '../../gateways/interfaces';
import { IIAMService } from '../../services/interfaces';

export interface IGatewayFactory {
    /**
     * Get an instance of an ITableDataGateway.
     * @param {string} table The name of the table you want a gateway to.
     */
    getTableDataGateway(table: string): ITableDataGateway | undefined;
}

export interface IServiceFactory {
    /**
     * Get an instance of an IAMService that controls access to the
     * given resources.
     * @param {string} resources The resources the IAMService controls
     * access to, for example "aws" for an IAMService that is used in
     * controlling access to S3, RDS, and other AWS resources.
     */
    getIAMService(resources: string): IIAMService | undefined;
}
