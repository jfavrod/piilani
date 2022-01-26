import 'reflect-metadata';

import { RestController } from '../../controllers/http';
import { RefStore } from '../../controllers/http/RefStore';
import { parsePath } from './helpers';
import { RouteRegistry } from './RouteRegistry';

import './server';

import {
  fromBodyMetadataKey,
  fromPathMetadataKey,
  Parameter,
  ParamType,
} from './types';


export function fromBody(param: string) {
  return function(target: RestController, propertyKey: string | symbol, parameterIndex: number): void {
    // Get the existing Parameter metadata stored on this target (method).
    const existingPathParams: Parameter[] = Reflect.getOwnMetadata(fromBodyMetadataKey, target, propertyKey) || [];

    existingPathParams.push({
      index: parameterIndex,
      mapping: fromBodyMetadataKey,
      paramName: param,
      type: 'object',
    });

    Reflect.defineMetadata(fromBodyMetadataKey, existingPathParams, target, propertyKey);
  };
}

export function fromPath(param: string, type?: ParamType) {
  return function(target: RestController, propertyKey: string | symbol, parameterIndex: number): void {
    // Get the existing Parameter metadata stored on this target (method).
    const existingPathParams: Parameter[] = Reflect.getOwnMetadata(fromPathMetadataKey, target, propertyKey) || [];

    existingPathParams.push({
      index: parameterIndex,
      mapping: fromPathMetadataKey,
      paramName: param,
      type: type || 'string'
    });

    Reflect.defineMetadata(fromPathMetadataKey, existingPathParams, target, propertyKey);
  };
}

export function get(path?: string): CallableFunction {
  return function(target: RestController, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor {
    const originalMethod = descriptor.value;
    const parsedPath = parsePath(target.basePath + (path || ''));
    const method = (target as unknown as Record<string, () => unknown>)[propertyKey];

    const pathParams: Parameter[] = Reflect.getOwnMetadata(fromPathMetadataKey, target, propertyKey) || [];
    pathParams.sort((a, b) => a.index - b.index);

    RouteRegistry.add({
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      function: () => method.apply(RefStore.getRef(target.constructor.name)!),
      method: 'GET',
      path: parsedPath.pathPattern,
      parameters: pathParams,
      pathParameterLocations: parsedPath.pathParamLocations,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    descriptor.value = function(this: any, ...args: any[]) {
      return originalMethod.apply(this, args);
    };

    return descriptor;
  };
}
