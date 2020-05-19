import { IGatewayResponse } from './interfaces';

export function isIGatewayResponse(obj: object): obj is IGatewayResponse {
    return (
        'class' in obj
        && (
            'data' in obj
            || 'message' in obj
        )
    );
}
