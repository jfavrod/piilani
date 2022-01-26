import { BaseController } from '../BaseController';
import { RefStore } from './RefStore';

export class RestController extends BaseController {
  protected _basePath = '';

  public constructor() {
    super();
    RefStore.addRef(this.constructor.name, this);
  }

  public get basePath(): string {
    return this._basePath;
  }

  protected setBasePath(path: string): void {
    this._basePath = path;
  }
}
