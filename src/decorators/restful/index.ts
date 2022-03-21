import 'reflect-metadata';

import { RestController } from '../../controllers/http';
import { parsePath } from './helpers';
import { RouteRegistry } from './RouteRegistry';

import './server';

import {
  fromBodyMetadataKey,
  fromPathMetadataKey,
  fromQueryMetadataKey,
  Parameter,
  ParamType,
} from './types';


export function fromBody() {
  return function(target: RestController, propertyKey: string | symbol, parameterIndex: number): void {
    // Get the existing Parameter metadata stored on this target (method).
    const existingPathParams: Parameter[] = Reflect.getOwnMetadata(fromBodyMetadataKey, target, propertyKey) || [];

    existingPathParams.push({
      index: parameterIndex,
      mapping: fromBodyMetadataKey,
      paramName: '',
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

export function fromQuery(param: string) {
  return function(target: RestController, propertyKey: string | symbol, parameterIndex: number): void {
    // Get the existing Parameter metadata stored on this target (method).
    const existingPathParams: Parameter[] = Reflect.getOwnMetadata(fromQueryMetadataKey, target, propertyKey) || [];

    existingPathParams.push({
      index: parameterIndex,
      mapping: fromQueryMetadataKey,
      paramName: param,
      type: 'string'
    });

    Reflect.defineMetadata(fromPathMetadataKey, existingPathParams, target, propertyKey);
  };
}

export function get(path?: string): CallableFunction {
  return function(target: RestController, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor {
    // Using any here because compiled code needs to use new keyword.
    // Was previous calling constructor without new.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const instance = new (target.constructor as any)() as RestController;

    const method = (target as unknown as Record<string, () => unknown>)[propertyKey];
    const originalDescriptor = descriptor.value;
    const parsedPath = parsePath(instance.basePath + (path || ''));
    const pathParams: Parameter[] = Reflect.getOwnMetadata(fromPathMetadataKey, target, propertyKey) || [];

    pathParams.sort((a, b) => a.index - b.index);

    RouteRegistry.add({
      constructor: target.constructor.name,
      function: method,
      method: 'GET',
      path: parsedPath.pathPattern,
      parameters: pathParams,
      pathParameterLocations: parsedPath.pathParamLocations,
    });

    descriptor.value = function(this: unknown, ...args: unknown[]) {
      return originalDescriptor.apply(this, args);
    };

    return descriptor;
  };
}

export function post(path?: string): CallableFunction {
  return function(target: RestController, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor {

    // Using any here because compiled code needs to use new keyword.
    // Was previous calling constructor without new.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const instance = new (target.constructor as any)() as RestController;

    const method = (target as unknown as Record<string, () => unknown>)[propertyKey];
    const originalDescriptor = descriptor.value;
    const parsedPath = parsePath(instance.basePath + (path || ''));

    const bodyParams: Parameter[] = Reflect.getOwnMetadata(fromBodyMetadataKey, target, propertyKey) || [];
    const pathParams: Parameter[] = Reflect.getOwnMetadata(fromPathMetadataKey, target, propertyKey) || [];
    pathParams.sort((a, b) => a.index - b.index);

    RouteRegistry.add({
      constructor: target.constructor.name,
      function: method,
      method: 'POST',
      path: parsedPath.pathPattern,
      parameters: [ ...bodyParams ,...pathParams ],
      pathParameterLocations: parsedPath.pathParamLocations,
    });

    descriptor.value = function(this: unknown, ...args: unknown[]) {
      return originalDescriptor.apply(this, args);
    };

    return descriptor;
  };
}
