import Response from './Response';

export default class BadRequest extends Response {
  private readonly _data?: Record<string, unknown>;

  public constructor(obj?: Record<string, unknown>) {
    super();
    this._data = obj;
  }

  public get data(): Record<string, unknown> | undefined {
    return this._data;
  }
}
