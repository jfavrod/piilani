import HttpResponse from './HttpResponse';
import HttpStatusCode from './HttpStatusCode';

export class Created extends HttpResponse {
  public constructor() {
    super(HttpStatusCode.CREATED);
  }
}

export default Created;
