import Response from './HttpResponse';
import HttpStatusCode from './HttpStatusCode';

export class BadRequest extends Response {
  private readonly _data?: Record<string, unknown>;

  public constructor(obj?: Record<string, unknown>) {
    super(HttpStatusCode.BAD_REQUEST);
    this._data = obj;
  }

  public get data(): Record<string, unknown> | undefined {
    return this._data;
  }
}

export default BadRequest;