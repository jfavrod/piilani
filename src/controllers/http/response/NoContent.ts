import { HttpResponse } from './HttpResponse';
import { HttpStatusCode } from './HttpStatusCode';

export class NoContent extends HttpResponse {
  public constructor() {
    super(HttpStatusCode.NO_CONTENT);
  }
}

export default NoContent;
