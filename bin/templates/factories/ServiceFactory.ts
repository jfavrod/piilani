import NotImplementedError from '../../errors/NotImplementedError';

import { IIAMService } from '../../services/interfaces';
import FactoryBase from './baseClasses/FactoryBase';
import { IServiceFactory } from './interfaces';

export default class ServiceFactory extends FactoryBase implements IServiceFactory {
    public getIAMService = (resources: string): IIAMService | undefined => {
        throw new NotImplementedError('ServiceFactory.getIAMService not implemented');
    }
}
