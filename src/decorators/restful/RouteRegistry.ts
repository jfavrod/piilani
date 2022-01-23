import { Route } from './types'

export class RouteRegistry {
    private static routes: Route[] = [];

    static add(route: Route): boolean {
        const found = RouteRegistry.routes.find((rt) => rt.path.source === route.path.source && rt.method === route.method);

        if (!found) {
            return Boolean(RouteRegistry.routes.push(route));
        }

        return false;
    }

    static findGet(path: string): Route | undefined {
        const found = RouteRegistry.routes.find((rt) => rt.path.test(path));
        return found;
    }
}
