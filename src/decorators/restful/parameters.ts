import 'reflect-metadata';

import { RestController } from '../../controllers/http';

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
