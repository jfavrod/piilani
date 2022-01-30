import HttpResponse from './HttpResponse';
import HttpStatusCode from './HttpStatusCode';

export const Ok = <T>(data?: T): HttpResponse<T> => {
  const ok = new HttpResponse<T>(HttpStatusCode.OK);
  ok.data = data;
  return ok;
};

export default Ok;
