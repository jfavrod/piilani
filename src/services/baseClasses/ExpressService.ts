/**
 * @packageDocumentation
 * @module Services
 */

import { Response } from 'express';
import { ILogger } from '../../context/interfaces';
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

    protected sendServiceResponse = (res: Response, serviceResponse: IServiceResponse) => {
        res.status(serviceResponse.code).json(serviceResponse);
    }
}
