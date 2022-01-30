import HttpStatusCode from './HttpStatusCode';

export class HttpResponse {
  public statusCode: Readonly<HttpStatusCode> = HttpStatusCode.INTERNAL_SERVER_ERROR;

  public constructor(statusCode: HttpStatusCode) {
    this.statusCode = statusCode;
  }
}

export default HttpResponse;
