import HttpStatusCode from './HttpStatusCode';

export class HttpResponse<T = undefined> {
  public statusCode: Readonly<HttpStatusCode> = HttpStatusCode.INTERNAL_SERVER_ERROR;
  public data: Readonly<T> | undefined;

  public constructor(statusCode: HttpStatusCode, data?: Readonly<T> | undefined) {
    this.statusCode = statusCode;
    this.data = data;
  }
}

export default HttpResponse;
