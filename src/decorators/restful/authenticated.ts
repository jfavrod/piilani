import 'reflect-metadata';
import { RestController } from '../../controllers/http';

type AuthRoute = { controller: string; method: string; };

export class AuthRegistry {
  private static routes: AuthRoute[] = [];

  public static add(route: AuthRoute) {
    AuthRegistry.routes.push(route);
  }

  public static authRequired(controller: string, method: string): boolean {
    return (
      AuthRegistry.routes.findIndex((rt) => rt.controller === controller && rt.method === method) !== -1
    );
  }
}

export function authenticated(): CallableFunction {
  return function(target: RestController, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor {
    const method = propertyKey;
    const originalDescriptor = descriptor.value;

    AuthRegistry.add({
      controller: target.constructor.name,
      method,
    });

    descriptor.value = function(this: unknown, ...args: unknown[]) {
      return originalDescriptor.apply(this, args);
    };

    return descriptor;
  };
}
