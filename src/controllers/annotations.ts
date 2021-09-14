import 'reflect-metadata'
import { Response } from 'express'

import { RestController } from '.';
import { ServiceFactory } from '../factories';

import { 
    BadRequest,
    Response as HttpResponse,
    Ok
} from './Http';

import { MetaData } from '../context';

type Consturctor = { new (...args: any[]): any };

type IParamMetadata = {
    index: number;
    paramName: string;
};

const fromPathMetadataKey = Symbol("fromPath");
let restMetaData: MetaData<RestController>;

export function fromPath(param: string, type?: string) {
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
export function httpGet(path: string) {
    return function (target: RestController, propertyName: string, descriptor: PropertyDescriptor): PropertyDescriptor {
        let params: IParamMetadata[] = Reflect.getOwnMetadata(fromPathMetadataKey, target, propertyName) || [];
        const originalMethod = descriptor.value;
        const http = ServiceFactory.getHttpServer()

        http.get(path, (req, res) => {
            const args = [] as any[];

            params = params.sort((a, b) => a.index - b.index);

            params.forEach((param) => {
                args.push(req.params[param.paramName])
            });

            const returnValue = descriptor.value.call(restMetaData.getRef(target.constructor.name), ...args);

            if (returnValue instanceof HttpResponse) {
                handleResponse(res, returnValue);
            }
            else {
                res.send(returnValue);
            }
        });

        descriptor.value = function(this: any, ...args: any[]) {
            return originalMethod.apply(this, args);
        }


        return descriptor;
    }
};

export function restController(md: MetaData<RestController>) {
    restMetaData = md;
    return function<T extends Consturctor>(constructor: T) {
    }
};
