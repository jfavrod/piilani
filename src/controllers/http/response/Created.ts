import HttpResponse from './HttpResponse';
import HttpStatusCode from './HttpStatusCode';

export const Created = (): HttpResponse => {
  return new HttpResponse(HttpStatusCode.CREATED);
};

export default Created;
