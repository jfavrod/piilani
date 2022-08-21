import 'reflect-metadata';

import { RestController } from '../../controllers/http';

import {
  fromBodyMetadataKey,
  fromPathMetadataKey,
  fromQueryMetadataKey,
  Parameter,
  ParamType,
} from './types';

/**
 * @param required True if the body parameter is required.
 */
export function fromBody(required?: boolean) {
  return function(target: RestController, propertyKey: string | symbol, parameterIndex: number): void {
    // Get the existing Parameter metadata stored on this target (method).
    const existingPathParams: Parameter[] = Reflect.getOwnMetadata(fromBodyMetadataKey, target, propertyKey) || [];

    existingPathParams.push({
      index: parameterIndex,
      mapping: fromBodyMetadataKey,
      paramName: '',
      required: required == undefined || required,
      type: 'object',
    });

    Reflect.defineMetadata(fromBodyMetadataKey, existingPathParams, target, propertyKey);
  };
}

/**
 * @param param The parameter, identified in the path with braces
 * (e.g. {param}).
 * @param type The type of the value of the param (default string).
 * @param required True if the param is required.
 */
export function fromPath(param: string, type?: ParamType, required?: boolean) {
  return function(target: RestController, propertyKey: string | symbol, parameterIndex: number): void {
    // Get the existing Parameter metadata stored on this target (method).
    const existingPathParams: Parameter[] = Reflect.getOwnMetadata(fromPathMetadataKey, target, propertyKey) || [];

    existingPathParams.push({
      index: parameterIndex,
      mapping: fromPathMetadataKey,
      paramName: param,
      required: required === undefined || required,
      type: type || 'string'
    });

    Reflect.defineMetadata(fromPathMetadataKey, existingPathParams, target, propertyKey);
  };
}

/**
 * @param param The query parameter.
 * @param type The type of the value of the param (default string).
 * @param required True if param is required.
 */
export function fromQuery(param: string, type?: ParamType, required?: boolean) {
  return function(target: RestController, propertyKey: string | symbol, parameterIndex: number): void {
    // Get the existing Parameter metadata stored on this target (method).
    const existingPathParams: Parameter[] = Reflect.getOwnMetadata(fromQueryMetadataKey, target, propertyKey) || [];

    existingPathParams.push({
      index: parameterIndex,
      mapping: fromQueryMetadataKey,
      paramName: param,
      required: required === undefined || required,
      type: type || 'string'
    });

    Reflect.defineMetadata(fromQueryMetadataKey, existingPathParams, target, propertyKey);
  };
}
