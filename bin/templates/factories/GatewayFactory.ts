import NotImplementedError from '../../errors/NotImplementedError';
import { ITableDataGateway } from '../../gateways/interfaces';
import FactoryBase from './baseClasses/FactoryBase';
import { IGatewayFactory } from './interfaces';

export default class GatewayFactory extends FactoryBase implements IGatewayFactory {
    public getTableDataGateway = (table: string): ITableDataGateway => {
        throw new NotImplementedError('GatewayFactory.getTableDataGateway not implemented');
    }
}
