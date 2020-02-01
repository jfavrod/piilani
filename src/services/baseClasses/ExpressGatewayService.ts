import { Response } from 'express';
import { ILogger } from '../../context/interfaces';
import { IGatewayResponse, ITableDataGateway } from '../../gateways/interfaces';
import { IServiceResponse } from '../interfaces';
import ExpressService from './ExpressService';

/**
 * Base class for transporting database data to/from a client using express.
 * SEE: http://expressjs.com/
 */
export default abstract class ExpressGatewayService extends ExpressService {
    protected gateway: ITableDataGateway | ITableDataGateway[] | undefined;

    constructor(gateway?: ITableDataGateway | ITableDataGateway[], logger?: ILogger) {
        super(logger);
        this.gateway = gateway;
    }

    /**
     * @param res An express Response object.
     * @param dbResponse The response from a Table Data Gateway used by this Service.
     * @param created Set to true if the request was for creating a database record.
     */
    protected sendDBResponse = (res: Response, dbResponse: IGatewayResponse, created?: boolean) => {
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
}
