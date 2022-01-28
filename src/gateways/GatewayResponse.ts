import { ITypedGatewayResponse } from '.';
import { IGatewayResponse } from './interfaces';

export class GatewayResponse<T> implements IGatewayResponse, ITypedGatewayResponse<T> {
  class: 1 | 2 | 3;
  data?: T[];
  message?: string | undefined;

  public constructor() {
    this.class = 3;
    this.data = [];
    this.message = 'Default response.';
  }
}
