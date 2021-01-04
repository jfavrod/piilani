/* eslint-disable @typescript-eslint/ban-types */
import { IGatewayResponse } from './interfaces';

export const isIGatewayResponse = (obj: object): obj is IGatewayResponse => (
    'class' in obj
    && (
        'data' in obj
        || 'message' in obj
    )
);
