import HttpResponse from './HttpResponse';
import HttpStatusCode from './HttpStatusCode';

export const BadRequest = (): HttpResponse => {
  return new HttpResponse(HttpStatusCode.BAD_REQUEST);
};

export default BadRequest;
