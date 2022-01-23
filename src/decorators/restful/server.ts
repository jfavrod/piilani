import { ServiceFactory } from '../../factories';

import { getArgs, getBody, normalizePath } from './helpers'
import { RouteRegistry } from './RouteRegistry'
import { Route } from './types'

console.log('server')

ServiceFactory.getHttpServer().on('request', (req, res) => {
    const path = normalizePath(req.url || '');
    let route: Route | undefined;
    // let parameters: any[] = [];

    if (req.method?.toUpperCase() === 'GET') {
        route = RouteRegistry.findGet(req.url || '');
    }


    getBody(req).then((body) => {
        if (route) {
            const argv = getArgs(route.parameters, route?.pathParameterLocations, path, body);
            console.log(route.function(...argv));
            res.statusCode = 200;
        }
        else {
            res.statusCode = 400;
        }
    })

    res.end();
})
