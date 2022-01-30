import HttpResponse from './HttpResponse';
import HttpStatusCode from './HttpStatusCode';

export class ServerError extends HttpResponse {
  public constructor() {
    super(HttpStatusCode.INTERNAL_SERVER_ERROR);
  }
}

export default ServerError;
