import 'reflect-metadata'
import { Response } from 'express'

import { RestController } from '.';
import { ServiceFactory } from '../factories';
import { Response as HttpResponse, Ok } from './Http';
import BadRequest from './Http/BadRequest';

type Consturctor = { new (...args: any[]): any };

type IParamMetadata = {
    index: number;
    paramName: string;
};

const fromPathMetadataKey = Symbol("fromPath");

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

const handleResponse = (res: Response, response: HttpResponse) => {
    if (response instanceof Ok) {
        if ((response as Ok).data) {
            res.send((response as Ok).data);
        }
        else {
            res.sendStatus(200);
        }
    }
    else if (response instanceof BadRequest) {
        if ((response as BadRequest).data) {
            res.statusCode = 400;
            res.send((response as BadRequest).data);
        }
        else {
            res.sendStatus(400);
        }
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

            const returnValue = method(...args);

            if (returnValue instanceof HttpResponse) {
                handleResponse(res, returnValue);
            }
            else {
                res.send(returnValue);
            }
        });
    }
};

export function restController(basePath?: string) {
    return function<T extends Consturctor>(constructor: T) {
        constructor.prototype.basePath = basePath;
    }
};
