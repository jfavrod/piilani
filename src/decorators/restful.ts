/* eslint-disable @typescript-eslint/no-explicit-any */
import { IncomingMessage } from 'http';
import { RestController } from '../controllers/http';
import { InvalidValueError } from '../errors'; import { ServiceFactory } from '../factories'
import { MetaData } from './MetaData';

type Constructor = { new (...args: any[]): any };
type HttpMethod = 'GET' | 'POST';
type ParamType = 'number' | 'string';

type ParamMetadata = {
    index: number;
    mapping: Symbol,
    paramName: string;
    type: ParamType | 'object';
    value?: unknown;
};

type RouteMapping = {
    function: (args: unknown[]) => unknown;
    method: HttpMethod;
    params: ParamMetadata[];
    route: string;
}

const fromBodyMetadataKey = Symbol('fromBody');
const fromPathMetadataKey = Symbol('fromPath');
const registeredRouteMappings = [] as RouteMapping[];

let restMetaData: MetaData<RestController>;

/**
 * Parse the body from an IncommingMessage HTTP request.
 * @returns The body as either a JSON.parse object or a string.
 * Rejects on error, returning the error.
 */
const getBody = (req: IncomingMessage): Promise<unknown> => {
    return new Promise((res,rej) => {
        let data = '';

        req.on('data', (dt) => {
            data += dt.toString()
        })

        req.on('end', () => {
            if (data) {
                try {
                    const obj = JSON.parse(data);
                    if (obj) {
                        res(obj)
                    }
                    else {
                        res(data);
                    }
                } catch (err) {
                    rej(err)
                }
            }
            else {
                res(undefined)
            }
        })
    });
};

/**
 * Map a route (stored in registeredMappings) based on the given
 * parameters.
 */
const mapRoute = (descriptor: PropertyDescriptor, method: HttpMethod,  propertyKey: string, route: string, target: RestController) => {
    const routeMapping = {} as RouteMapping
    console.log('mapping route', propertyKey)

    routeMapping.method = method;

    // Separate the route from the path parameters.
    routeMapping.route = route.replace(/^\/*/, '/').replace(/(\/\{\w+\})/g, '')
    console.log('constructor ref', restMetaData.getRef(target.constructor.name))
    routeMapping.function = (args: any[]) => descriptor.value.call(restMetaData.getRef(target.constructor.name), ...args)

    routeMapping.params = [];

    const mappingDecorators = [fromBodyMetadataKey, fromPathMetadataKey];
    let parameterMetadata: ParamMetadata[] = [];

    // Check for parameter mappings.
    // E.g. @fromBody mapping from HttpBody to method parameter.
    for (let i = 0; i < mappingDecorators.length; i++) {
        // The parameter mapping type (e.g. fromBody, fromPath).
        const paramType: Symbol = mappingDecorators[i];

        parameterMetadata = Reflect.getOwnMetadata(paramType, target, propertyKey) || [];

        if (parameterMetadata.length) {
            routeMapping.params = routeMapping.params.concat(parameterMetadata);
            console.log('param metadata', parameterMetadata)
        }
    }

    if (!routeMappingRegistered(routeMapping)) {
        registeredRouteMappings.push(routeMapping);
    }
    else {
        throw new InvalidValueError(`Route mapping (${JSON.stringify(routeMapping)}) already registered!`);
    }
    console.log('-----')
}

/** Make sure there's a leading slash and remove any trailing slash. */
const normalizeRoute = (route: string) => route.replace(/^\/?/, '/').replace(/\/$/, '')

/**
 * Check if the given RouteMapping is already registered.
 */
const routeMappingRegistered = (routeMapping: RouteMapping): boolean => {
    let existing: RouteMapping;

    for (let i = 0; i < registeredRouteMappings.length; i++) {
        existing = registeredRouteMappings[i];

        if (routeMapping.route === existing.route) {
            if (JSON.stringify(routeMapping.params) === JSON.stringify(existing.params)) {
                if (routeMapping.method === existing.method) {
                    return true;
                }
            }
        }
    }

    return false;
};

/**
 * Test the given url for a matching RouteMapping.
 * Return the RouteMapping, if found, undefined otherwise.
 */
const routeMatch = (url: string, method: HttpMethod): RouteMapping | undefined => {
    for (let i = 0; i < registeredRouteMappings.length; i++) {
        const routeMapping = registeredRouteMappings[i];

        if (new RegExp(routeMapping.route).test(url) && routeMapping.method === method) {
            console.log('match', url, routeMapping)

            // Return the RouteMapping if we don't need to worry about
            // mapping params to args.
            if (!routeMapping.params.length) {
                return routeMapping;
            }

            const fromPathMappings = routeMapping.params.filter((param) => param.mapping === fromPathMetadataKey)

            // If there is fromPath param mappings, check for args.
            if (fromPathMappings.length) {
                // Strip out the route portion, to get the path args.
                const args = url.replace(routeMapping.route, '').split('/');
                console.log('args', args)

                removeEmptyStringCreateBySplitMethod(args);

                if (args.length === fromPathMappings.length) {
                    return routeMapping;
                }
            }

            return routeMapping
        }
    }
};

/**
 * Remove the empty string created by splitting a path on '/'
 * because of the path's leading slash.
 */
const removeEmptyStringCreateBySplitMethod = (arr: string[]) => {
    arr.splice(0, 1)
};

/**
 * Get the arguments for the parameters specified in the given
 * RouteMapping from the given URL.
 */
const getArgs = (url: string, routeMapping: RouteMapping): any[] => {
    const args = [] as any[];

    if (routeMapping.params.length) {
        const argsPortion = url.replace(routeMapping.route, '').split('/');

        removeEmptyStringCreateBySplitMethod(argsPortion);

        routeMapping.params.forEach((param, idx) => {
            if (param.type === 'number') args[param.index] = Number(argsPortion[idx])
            else if (param.type === 'object') console.log('object param', args[param.index])
            else args[param.index] = argsPortion[idx]
        })
    }

    return args
}

ServiceFactory.getHttpServer().on('request', (req, res) => {
    const routeMapping = routeMatch(req.url as string, (req.method as unknown as HttpMethod));

    if (routeMapping) {
        res.statusCode = 200;

        getBody(req).then((body) => {
            let response: any;

            const handleResponse = (response: unknown) => {
                if (typeof(response) === 'string') {
                    res.setHeader('Content-type', 'text/plain')
                    res.write(response)
                    res.end()
                }
                else if (response === undefined) {
                    res.setHeader('Content-type', 'application/json')
                    res.write('{}')
                    res.end()
                }
                else {
                    res.setHeader('Content-type', 'application/json')
                    res.write(JSON.stringify(response))
                    res.end()
                }
            }

            if (routeMapping.method === 'POST') {
                // TODO: We should check the routeMapping's params
                // before constructing the args array.
                console.log('body', body)
                response = routeMapping.function([body]);
            }
            else {
                response = routeMapping.function(getArgs(req.url as string, routeMapping));
            }

            if (response instanceof Promise) {
                response
                    .then((resolved) => handleResponse(resolved))
                    .catch((err) => console.warn(err))
            }
            else {
                handleResponse(response)
            }

        })
            .catch((err) => {
                console.warn(err)
                res.statusCode = 500
                res.write('server error')
                res.end()
            })
    }
    else {
        res.statusCode = 404;
        res.write('not found')
        res.end()
    }
});

export function fromBody(param: string) {
    return function(target: RestController, propertyKey: string | symbol, parameterIndex: number): void {

        const existingPathParams: ParamMetadata[] = Reflect.getOwnMetadata(fromBodyMetadataKey, target, propertyKey) || [];

        existingPathParams.push({
            index: parameterIndex,
            mapping: fromBodyMetadataKey,
            paramName: param,
            type: 'object',
        });

        Reflect.defineMetadata(fromBodyMetadataKey, existingPathParams, target, propertyKey)
    }
}

export function fromPath(param: string, type?: ParamType) {
    return function(target: RestController, propertyKey: string | symbol, parameterIndex: number): void {

        const existingPathParams: ParamMetadata[] = Reflect.getOwnMetadata(fromPathMetadataKey, target, propertyKey) || [];

        existingPathParams.push({
            index: parameterIndex,
            mapping: fromPathMetadataKey,
            paramName: param,
            type: type || 'string'
        });

        Reflect.defineMetadata(fromPathMetadataKey, existingPathParams, target, propertyKey)
    }
}

export function get(route: string): CallableFunction {
    route = normalizeRoute(route)

    return function(target: RestController, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor {
        const originalMethod = descriptor.value;

        mapRoute(descriptor, 'GET', propertyKey, route, target);

        descriptor.value = function(this: any, ...args: any[]) {
            return originalMethod.apply(this, args);
        }

        return descriptor;
    }
}

export function post(route: string): CallableFunction {
    route = normalizeRoute(route);

    return function(target: RestController, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor {
        const originalMethod = descriptor.value;

        mapRoute(descriptor, 'POST', propertyKey, route, target);

        descriptor.value = function(this: any, ...args: any[]) {
            return originalMethod.apply(this, args);
        }

        return descriptor;
    }
}

export function restController(md: MetaData<RestController>): CallableFunction {
    restMetaData = md;
    return function<T extends Constructor>(constructor: T): T {
        return constructor;
    }
}
