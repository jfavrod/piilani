import 'reflect-metadata'
import { RestController } from '.';

import { ConfigFactory, ServiceFactory } from '../factories';

type Consturctor = { new (...args: any[]): any };

type IParamMetadata = {
    index: number;
    paramName: string;
};

const config = ConfigFactory.getInstance();
const fromPathMetadataKey = Symbol("fromPath");

export function restController(basePath?: string) {
    return function<T extends Consturctor>(constructor: T) {
        constructor.prototype.basePath = basePath;
    }
};

/**
 * RestController decorator for methods that handle HttpGet requests.
 * @param path 
 */
export const httpGet = function(path: string) {
    return function (target: RestController, propertyName: string, descriptor: any) {
        let method = descriptor.value;
        let args: IArguments;

        descriptor.value = function() {
            let existingPathParams: IParamMetadata[] = Reflect.getOwnMetadata(fromPathMetadataKey, target, propertyName) || [];

            if (existingPathParams) {
                return existingPathParams;
            }
        };

        ServiceFactory.getHttpServer().get(path, (req, res) => {
            const args = [] as any[];
            var params = descriptor.value() as IParamMetadata[];

            params = params.sort((a, b) => a.index - b.index);
            params.forEach((param) => {
                args.push(req.params[param.paramName])
            });

            res.send(method(...args));
        });
    }
};

export const fromPath = function(param: string, type?: string) {
    return function(target: RestController, propertyKey: string | symbol, parameterIndex: number) {

        let existingPathParams: IParamMetadata[] = Reflect.getOwnMetadata(fromPathMetadataKey, target, propertyKey) || [];

        existingPathParams.push({
            index: parameterIndex,
            paramName: param,
        });

        Reflect.defineMetadata(fromPathMetadataKey, existingPathParams, target, propertyKey)
    }
};
