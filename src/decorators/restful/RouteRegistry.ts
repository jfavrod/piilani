import { fromPathMetadataKey, fromQueryMetadataKey, Parameter, Route } from './types';

export class RouteRegistry {
  private static routes: Route[] = [];

  static add(route: Route): boolean {
    const found = RouteRegistry.routes.find((rt) => {
      return (
        rt.path.source === route.path.source &&
        rt.method === route.method &&
        JSON.stringify(rt.parameters) === JSON.stringify(route.parameters)
      );
    });

    if (!found) {
      return Boolean(RouteRegistry.routes.push(route));
    }

    return false;
  }

  static findDelete(path: string): Route | undefined {
    const found = RouteRegistry.routes.find((rt) => {
      if (rt.method !== 'DELETE') return false;

      let pathPattern = rt.path;

      const pathParams = rt.parameters
        .filter((param: Parameter) => param.mapping === fromPathMetadataKey);
      
      if (pathParams.length) {
        pathPattern = new RegExp(pathPattern.source.replace('$', '') + /\/\w+/.source);
      }

      const queryParams = rt.parameters
        .filter((param: Parameter) => param.mapping === fromQueryMetadataKey);

      if (queryParams.length) {
        pathPattern = new RegExp(pathPattern.source.replace('$', '') + /\?/.source);
      }

      for (let i = 0; i < queryParams.length; i++) {
        // If there's more than one query param, add the amp.
        if (i) pathPattern = new RegExp(pathPattern.source + '&');

        pathPattern = new RegExp(
          pathPattern.source + queryParams[i].paramName + /=\w+/.source
        );

        if (!queryParams[i].required) {
          pathPattern = new RegExp(
            `(${pathPattern.source})?`
          );
        }
      }

      return pathPattern.test(path);
    });
    return found;
  }

  static findGet(path: string): Route | undefined {
    return RouteRegistry.routes.find((rt) => {
      if (rt.method !== 'GET') return false;

      const url = new URL(`http://example.com${path}`);
      const pathPattern = rt.path;

      if (pathPattern.test(url.pathname)) {
        const queryParams = rt.parameters
          .filter((param: Parameter) => param.mapping === fromQueryMetadataKey);

        if (queryParams.length) {
          for (const param of queryParams.filter((param) => param.required)) {
            if (!Array.from(url.searchParams.keys()).includes(param.paramName)) {
              return false;
            }
          }

          return true;
        } else {
          return true;
        }
      }
    });
  }

  static findPost(path: string): Route | undefined {
    const found = RouteRegistry.routes.find((route) => {
      return (route.method === 'POST' && route.path.test(path));
    });

    return found;
  }

  static findPut(path: string): Route | undefined {
    const found = RouteRegistry.routes.find((route) => {
      return (route.method === 'PUT' && route.path.test(path));
    });

    return found;
  }
}
