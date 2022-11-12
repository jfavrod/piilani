import { ICredentials } from '../../services/auth/ICredentials';
import { BaseController } from '../BaseController';
import { RefStore } from './RefStore';

export class RestController extends BaseController {
  private _basePath = '';
  private _user: ICredentials | undefined;

  public constructor() {
    super();
    RefStore.addRef(this.constructor.name, this);
  }

  /**
   * Base Route path used for REST endpoints.
   */
  public get basePath(): string {
    return this._basePath;
  }

  protected set basePath(path: string) {
    this._basePath = path;
  }

  /**
   * When using secured endpoints, populated (by the framework)
   * with the user accessing the endpoint.
   */
  public get user(): ICredentials | undefined {
    return this._user;
  }
}
