import { ControllerBase } from "../controllers";

export default class ControllerRegistry {
    private static controllers = [] as ControllerBase[];

    public static addController(controller: ControllerBase) {
        ControllerRegistry.controllers.push(controller);
    }

    public static getControllers() {
        return ControllerRegistry.controllers;
    }
}
