import HttpResponse from './HttpResponse';
import HttpStatusCode from './HttpStatusCode';

export const Forbid = (): HttpResponse => {
  return new HttpResponse(HttpStatusCode.FORBIDDEN);
};

export default Forbid;
