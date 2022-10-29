import 'reflect-metadata';

import { RestController } from '../../controllers/http';
import { parsePath } from './helpers';
import { RouteRegistry } from './RouteRegistry';

import {
  fromBodyMetadataKey,
  fromPathMetadataKey,
  fromQueryMetadataKey,
  Parameter,
} from './types';

/**
 * @param path The HTTP request path (appended to class' basePath)
 * that this method handles.
 */
export function del(path?: string): CallableFunction {
  return function(target: RestController, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor {
    const instance = new (target.constructor as { new(): RestController })();
    const method = (target as unknown as Record<string, () => unknown>)[propertyKey];
    const originalDescriptor = descriptor.value;
    const parsedPath = parsePath(instance.basePath + (path || ''));
    const pathParams: Parameter[] = Reflect.getOwnMetadata(fromPathMetadataKey, target, propertyKey) || [];
    const queryParams: Parameter[] = Reflect.getOwnMetadata(fromQueryMetadataKey, target, propertyKey) || [];

    pathParams.sort((a, b) => a.index - b.index);

    RouteRegistry.add({
      constructor: target.constructor.name,
      function: method,
      method: 'DELETE',
      path: parsedPath.pathPattern,
      parameters: pathParams.concat(queryParams),
      pathParameterLocations: parsedPath.pathParamLocations,
    });

    descriptor.value = function(this: unknown, ...args: unknown[]) {
      return originalDescriptor.apply(this, args);
    };

    return descriptor;
  };
}

/**
 * @param path The HTTP request path (appended to class' basePath)
 * that this method handles.
 */
export function get(path?: string): CallableFunction {
  return function(target: RestController, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor {
    const instance = new (target.constructor as { new(): RestController })();
    const method = (target as unknown as Record<string, () => unknown>)[propertyKey];
    const originalDescriptor = descriptor.value;
    const parsedPath = parsePath(instance.basePath + (path || ''));
    const pathParams: Parameter[] = Reflect.getOwnMetadata(fromPathMetadataKey, target, propertyKey) || [];
    const queryParams: Parameter[] = Reflect.getOwnMetadata(fromQueryMetadataKey, target, propertyKey) || [];

    pathParams.sort((a, b) => a.index - b.index);

    RouteRegistry.add({
      constructor: target.constructor.name,
      function: method,
      method: 'GET',
      path: parsedPath.pathPattern,
      parameters: pathParams.concat(queryParams),
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
