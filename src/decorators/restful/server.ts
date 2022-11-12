import { RefStore } from '../../controllers/http/RefStore';
import { HttpResponse } from '../../controllers/http/response';
import { ServiceFactory } from '../../context/factories';

import { getArgs, getBody, normalizePath } from './helpers';
import { RouteRegistry } from './RouteRegistry';
import { Route } from './types';
import { AuthRegistry } from './authenticated';
import { ICredentials } from '../../services/auth/ICredentials';
import { Authentication } from '../../services/auth/Authentication';

ServiceFactory.getHttpServer().on('request', (req, res) => {
  const path = normalizePath(req.url || '');
  let route: Route | undefined;

  if (req.method?.toUpperCase() === 'GET') {
    route = RouteRegistry.findGet(path);
  }
  else if (req.method?.toUpperCase() === 'DELETE') {
    route = RouteRegistry.findDelete(path);
  }
  else if (req.method?.toUpperCase() === 'POST') {
    route = RouteRegistry.findPost(path);
  }
  else if (req.method?.toUpperCase() === 'PUT') {
    route = RouteRegistry.findPut(path);
  }

  getBody(req).then(async (body) => {
    if (route) {
      // Handle authentication.
      if (AuthRegistry.authRequired(route.constructor, route.function.name)) {
        const authHeader = req.headers.authorization;
        const controller = RefStore.getRef(route.constructor);

        if (authHeader && authHeader.match(/^Bearer /i)) {
          const username = Authentication.verify(authHeader.replace(/^Bearer /i, '')) as string;

          // Overriding access modifier to set _user on the Controller
          // that is configured to handle the given route.
          (controller as { _user: ICredentials })._user = { username, password: '' };
        } else {
          res.statusCode = 401;
        }
      }

      const argv = getArgs(route.parameters, route?.pathParameterLocations, path, body);

      if (res.statusCode === 401) {
        res.end();
      } else {
        try {
          const response = await route.function.call(RefStore.getRef(route.constructor), ...argv);

          if (response) {
            if (response instanceof HttpResponse) {
              res.statusCode = response.statusCode;
            }
            else {
              res.statusCode = 200;
            }

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
