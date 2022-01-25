export const fromBodyMetadataKey = Symbol('fromBody')
export const fromPathMetadataKey = Symbol('fromPath')

export type MessageBody = string | Record<string, unknown>;

export type Parameter = {
    index: number;
    mapping: symbol,
    paramName: string;
    type: ParamType | 'object';
    value?: unknown;
};

export type ParamType = 'number' | 'string';

export type ParsedPath = {
  /** RegExp that identifies the incoming request. */
  pathPattern: RegExp;
  /** The locations - if any - of the parameters in the path. */
  pathParamLocations: number[];
}

export type Route = {
  function: CallableFunction;
  method: 'GET' | 'POST';
  path: RegExp;
  parameters: Parameter[];
  pathParameterLocations: number[];
}
