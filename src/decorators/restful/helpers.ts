import { IncomingMessage } from 'http';
import { URL } from 'url';

import {
  fromBodyMetadataKey,
  fromPathMetadataKey,
  fromQueryMetadataKey,
  MessageBody,
  ParsedPath,
  Parameter,
} from './types';

export const getArgs = (parameters: Parameter[], pathParamLocations: number[], path: string, body: MessageBody): unknown[] => {
  const returnArgs: unknown[] = [];
  const pathParts = splitPath(path);

  const bodyParams = parameters.filter((param) => param.mapping === fromBodyMetadataKey);
  const pathParams = parameters.filter((param) => param.mapping === fromPathMetadataKey);
  const queryParams = parameters.filter((param) => param.mapping === fromQueryMetadataKey);

  bodyParams.forEach((param) => {
    returnArgs[param.index] = body;
  });

  pathParamLocations.forEach((paramLocation, idx) => {
    returnArgs[pathParams[idx].index] = pathParts[paramLocation];
  });

  if (queryParams.length) {
    const searchParams = new URL('http://test.me' + path).searchParams;
    queryParams.forEach((param) => {
      let val: string | null | number | undefined = searchParams.get(param.paramName);

      if (val) {
        if (param.type === 'number') {
          val = Number(val);
        }
      }
      else {
        val = undefined;
      }

      returnArgs[param.index] = val;
    });
  }

  return returnArgs;
};

/**
 * Parse the body from an IncomingMessage HTTP request.
 * @returns The body as either a JSON.parse object or a string.
 * Rejects on error, returning the error.
 */
export const getBody = (req: IncomingMessage): Promise<Record<string, unknown> | string> => {
  return new Promise((res,rej) => {
    let data = '';

    req.on('data', (dt) => {
      data += dt;
    });

    req.on('end', () => {
      if (data) {
        try {
          const obj: Record<string, unknown> = JSON.parse(data);

          if (obj) {
            res(obj);
          }
          else {
            res(data);
          }
        } catch (err) {
          rej(err);
        }
      }
      else {
        res('');
      }
    });
  });
};

export const parsePath = (path: string): ParsedPath  => {
  const pathParamLocations: number[] = [];
  const pathParamPattern = /{\w+}/;
  const pathParts = splitPath(path);
  let pathPattern = /^/;

  pathParts.forEach((part, index) => {
    if (!part.match(pathParamPattern)) {
      pathPattern = new RegExp(pathPattern.source + '/' + part);
    } else {
      pathPattern = new RegExp(pathPattern.source + '/' + /\w+/.source);
      // Plus one, because the controller name is the base of the path.
      pathParamLocations.push(index + 1);
    }
  });

  pathPattern = new RegExp(pathPattern.source + /$/.source);

  return {
    pathPattern,
    pathParamLocations,
  };
};

export const getRegExpForPath = (path: string): RegExp => {
  const pathParamPattern = /\/{\w+}/g;
  const pathParamCount = path.match(pathParamPattern)?.length;

  let pattern = new RegExp(path.replace(pathParamPattern, ''));

  if (pathParamCount) {
    for (let i = 0; i < pathParamCount; i++) {
      pattern = new RegExp(pattern.source + /\/\w+/.source);
    }
  }

  return pattern;
};

export const getRegExpForPathParams = (path: string): RegExp => {
  const pathParamPattern = /\/{\w+}/g;
  const pathParamCount = path.match(pathParamPattern)?.length;

  let pattern = new RegExp(path.replace(pathParamPattern, ''));

  if (pathParamCount) {
    for (let i = 0; i < pathParamCount; i++) {
      pattern = new RegExp(pattern.source + /\/\w+/.source);
    }
  }

  return pattern;
};

/** Make sure there's a leading slash and remove any trailing slash. */
export const normalizePath = (path: string): string => (
  path.replace(/^\/?/, '/').replace(/\/$/, '')
);

/**
 * Example in: /my/route/{param1}/{param2}
 * Example out: [ 'my', 'route', '{param1}', '{param2}' ]
 */
export const splitPath = (path: string): string[] => {
  const pathSplit = path.split('/');
  // Remove the empty string that represents the leading slash.
  pathSplit.splice(0, 1);
  return pathSplit;
};
