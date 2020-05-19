/**
 * @packageDocumentation
 * @module Services
 */

import { Response } from 'express';
import { ILogger } from '../../context/interfaces';
import { IGatewayResponse } from '../../gateways/interfaces';
import { IServiceResponse } from '../interfaces';
import ServiceBase from './ServiceBase';

/**
 * Base class for transporting data to/from a client using express.
 * SEE: http://expressjs.com/
 */
export default abstract class ExpressService extends ServiceBase {
    constructor(logger?: ILogger) {
        super(logger);
    }

    protected sendError = (res: Response, err: Error) => {
        res.status(500).json({
            code: 500,
            error: true,
            message: err.toString(),
        } as IServiceResponse);
    }

    /**
     * @param res An express Response object.
     * @param dbResponse The response from a Table Data Gateway used by this Service.
     * @param created Set to true if the request was for creating a database record.
     */
    protected sendGatewayResponse(res: Response, dbResponse: IGatewayResponse, created?: boolean) {
        const response: IServiceResponse = {
            code: 200,
            data: undefined,
            error: false,
            message: undefined,
        };

        if (dbResponse.class === 0) {
            if (created) {
                response.code = 201;
            }
            if (dbResponse.data && dbResponse.data instanceof Array && !dbResponse.data.length) {
                response.code = 204;
            }
        }
        else if (dbResponse.class === 1) {
            response.code = 400;
            response.error = true;
        }
        else {
            response.code = 500;
            response.error = true;
        }

        if (dbResponse.data) {
            response.data = dbResponse.data;
        }

        if (dbResponse.message) {
            response.message = dbResponse.message;
        }

        res.status(response.code).json(response);
    }

    protected sendServiceResponse(res: Response, serviceResponse: IServiceResponse) {
        res.status(serviceResponse.code).json(serviceResponse);
    }
}
