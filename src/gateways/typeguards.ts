import { IGatewayResponse } from './interfaces';

// eslint-disable-next-line @typescript-eslint/ban-types
export const isIGatewayResponse = (obj: object): obj is IGatewayResponse => (
  'class' in obj
    && (
      'data' in obj
        || 'message' in obj
    )
);
