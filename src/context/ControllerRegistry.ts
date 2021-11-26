import { HttpControllerBase } from '../controllers/http';

export class HttpControllerRegistry {
    private static controllers = [] as HttpControllerBase[];

    public static addController(controller: HttpControllerBase): void {
        HttpControllerRegistry.controllers.push(controller);
    }

    public static getControllers(): HttpControllerBase[] {
        return HttpControllerRegistry.controllers;
    }
}

export default HttpControllerRegistry
