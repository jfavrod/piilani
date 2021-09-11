import { Request, Response } from 'express';
import { ILogger } from '../context/interfaces';
import { IGatewayResponse, ITableDataGateway } from '../gateways/interfaces';
import { IServiceResponse } from '../services/interfaces';
import ControllerBase from './ControllerBase';

export default abstract class ExpressGatewayRouter extends ControllerBase {
    public readonly className = this.constructor.name;
    protected gateway: ITableDataGateway;

    public constructor(gateway: ITableDataGateway, logger?: ILogger) {
        super(logger);
        this.gateway = gateway;
        this.delete = this.delete.bind(this);
        this.get = this.get.bind(this);
        this.post = this.post.bind(this);
        this.put = this.put.bind(this);
    }

    public async delete(req: Request, res: Response): Promise<void> {
        let dbResponse: IGatewayResponse;
        this.logger.log('info', `${this.className}.delete(${JSON.stringify(req.query)})`);

        try {
            // TODO: fix this.
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            dbResponse = await this.gateway.delete(req.query.key);
            this.sendGatewayResponse(res, dbResponse);
        }
        catch (err) {
            this.logger.log('warn',
                `${this.className}.delete(): ${(err as Error).message}`);
            this.sendError(res, err as Error);
        }
    }

    public async get(req: Request, res: Response): Promise<void> {
        let dbResponse: IGatewayResponse;

        try {
            dbResponse = await this.gateway.find(req.params);
            this.sendGatewayResponse(res, dbResponse);
        }
        catch (err) {
            this.logger.log('warn', `${this.className}.get: ${(err as Error).message}`);
            this.sendError(res, err as Error);
        }
    }

    public async post(req: Request, res: Response): Promise<void> {
        let dbResponse: IGatewayResponse;

        try {
            dbResponse = await this.gateway.insert(req.body);
            this.sendGatewayResponse(res, dbResponse, true);
        }
        catch (err) {
            this.logger.log('warn', `${this.className}.post(${JSON.stringify(req.body)}): ${(err as Error).message}`);
            this.sendError(res, err as Error);
        }
    }

    public async put(req: Request, res: Response): Promise<void> {
        let dbResponse: IGatewayResponse;

        try {
            dbResponse = await this.gateway.update(req.body);
            this.sendGatewayResponse(res, dbResponse);
        }
        catch (err) {
            this.logger.log('warn', `${this.className}.put(${JSON.stringify(req.body)}): ${(err as Error).message}`);
            this.sendError(res, err as Error);
        }
    }

    protected sendError(res: Response, err: Error): void {
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
    protected sendGatewayResponse(res: Response, dbResponse: IGatewayResponse, created?: boolean): void {
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
            // TODO: fix this.
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            response.data = dbResponse.data;
        }

        if (dbResponse.message) {
            response.message = dbResponse.message;
        }

        res.status(response.code).json(response);
    }

    protected sendServiceResponse(res: Response, serviceResponse: IServiceResponse): void {
        res.status(serviceResponse.code).json(serviceResponse);
    }
}
