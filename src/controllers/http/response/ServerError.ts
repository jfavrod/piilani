import HttpResponse from './HttpResponse';
import HttpStatusCode from './HttpStatusCode';

export const ServerError = (): HttpResponse => {
  return new HttpResponse(HttpStatusCode.INTERNAL_SERVER_ERROR);
};

export default ServerError;
