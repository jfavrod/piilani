import { BaseController } from '../BaseController';
import { RefStore } from './RefStore';

export class RestController extends BaseController {
  private _basePath = '';

  public constructor() {
    super();
    RefStore.addRef(this.constructor.name, this);
  }

  public get basePath(): string {
    return this._basePath;
  }

  protected set basePath(path: string) {
    this._basePath = path;
  }
}
