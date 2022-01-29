import { RefStore } from '../../controllers/http/RefStore';
import { ServiceFactory } from '../../factories';

import { getArgs, getBody, normalizePath } from './helpers';
import { RouteRegistry } from './RouteRegistry';
import { Route } from './types';

ServiceFactory.getHttpServer().on('request', (req, res) => {
  const path = normalizePath(req.url || '');
  let route: Route | undefined;

  if (req.method?.toUpperCase() === 'GET') {
    route = RouteRegistry.findGet(path);
  }

  getBody(req).then(async (body) => {
    if (route) {
      const argv = getArgs(route.parameters, route?.pathParameterLocations, path, body);

      try {
        const response = await route.function.call(RefStore.getRef(route.constructor), ...argv);

        if (response) {
          res.statusCode = 200;

          if (typeof response === 'object') {
            res.setHeader('content-type', 'application/json');
          } else {
            res.setHeader('content-type', 'text/plain');
          }

          res.end(JSON.stringify(response));
        } else {
          res.statusCode = 204;
        }
      }
      catch ({ message }) {
        res.statusCode = 500;
        res.end(message);
      }
    }
    else {
      res.statusCode = 404;
      res.end();
    }
  })
    .catch(({ message }) => {
      res.statusCode = 500;
      res.end(message);
    });

});
