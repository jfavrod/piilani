import 'reflect-metadata';

import { RestController } from '../../controllers/http';
import { parsePath } from './helpers';
import { RouteRegistry } from './RouteRegistry';

import {
  fromBodyMetadataKey,
  fromPathMetadataKey,
  Parameter,
} from './types';


export function get(path?: string): CallableFunction {
  return function(target: RestController, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor {
    const instance = new (target.constructor as { new(): RestController })();
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
    const instance = new (target.constructor as { new(): RestController })();
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

export function put(path?: string): CallableFunction {
  return function(target: RestController, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor {
    const instance = target.constructor() as RestController;
    const method = (target as unknown as Record<string, () => unknown>)[propertyKey];
    const originalDescriptor = descriptor.value;
    const parsedPath = parsePath(instance.basePath + (path || ''));

    const bodyParams: Parameter[] = Reflect.getOwnMetadata(fromBodyMetadataKey, target, propertyKey) || [];
    const pathParams: Parameter[] = Reflect.getOwnMetadata(fromPathMetadataKey, target, propertyKey) || [];
    pathParams.sort((a, b) => a.index - b.index);

    RouteRegistry.add({
      constructor: target.constructor.name,
      function: method,
      method: 'PUT',
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
