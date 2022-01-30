import HttpResponse from './HttpResponse';
import HttpStatusCode from './HttpStatusCode';

export class Ok<T> extends HttpResponse {
  public data: Readonly<T> | undefined;

  public constructor(obj?: T) {
    super(HttpStatusCode.OK);
    this.data = Object.freeze(obj);
  }
}

export default Ok;
