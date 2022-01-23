import { BaseController } from '../BaseController';

export class RestController extends BaseController {
    protected _basePath = '';

    public get basePath(): string {
        return this._basePath;
    }

    protected setBasePath(path: string): void {
        this._basePath = path;
    }
}
