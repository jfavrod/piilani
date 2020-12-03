import { Request, Response } from 'express';
import { ILogger } from '../../context/interfaces';
import { IHttpExpressRouter } from '../interfaces';
import ExpressService from './ExpressService';

export default abstract class ExpressRouter extends ExpressService implements IHttpExpressRouter {
    constructor(logger?: ILogger) {
        super(logger);
    }

    public delete(req: Request, res: Response): Promise<void> {
        throw new Error('Method not implemented.');
    }

    public get(req: Request, res: Response): Promise<void> {
        throw new Error('Method not implemented.');
    }

    public post(req: Request, res: Response): Promise<void> {
        throw new Error('Method not implemented.');
    }

    public put(req: Request, res: Response): Promise<void> {
        throw new Error('Method not implemented.');
    }
}
