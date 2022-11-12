import HttpResponse from './HttpResponse';
import HttpStatusCode from './HttpStatusCode';

export const Created = <T>(data?: T): HttpResponse<T> => {
  return new HttpResponse(HttpStatusCode.CREATED, data);
};

export default Created;
