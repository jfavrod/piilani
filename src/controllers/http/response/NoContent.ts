import { HttpResponse } from './HttpResponse';
import { HttpStatusCode } from './HttpStatusCode';

export const NoContent = (): HttpResponse => {
  return new HttpResponse(HttpStatusCode.NO_CONTENT);
};

export default NoContent;
