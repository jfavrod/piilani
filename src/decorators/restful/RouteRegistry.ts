import { fromQueryMetadataKey, Parameter, Route } from './types';

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

  static findGet(path: string): Route | undefined {
    const found = RouteRegistry.routes.find((rt) => {
      if (rt.method !== 'GET') return false;

      let pathPattern = rt.path;

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
      }

      return pathPattern.test(path);
    });
    return found;
  }

  static findPost(path: string): Route | undefined {
    const found = RouteRegistry.routes.find((route) => {
      return (route.method === 'POST' && route.path.test(path));
    });

    return found;
  }
}
