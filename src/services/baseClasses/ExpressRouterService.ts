import { Request, Response } from 'express';
import { ILogger } from '../../context/interfaces';
import { IHttpExpressRouter } from '../interfaces';
import ExpressService from './ExpressService';

export default abstract class ExpressRouter extends ExpressService implements IHttpExpressRouter {
    public constructor(logger?: ILogger) {
        super(logger);
    }

    public abstract delete(req: Request, res: Response): Promise<void>;
    public abstract get(req: Request, res: Response): Promise<void>;
    public abstract post(req: Request, res: Response): Promise<void>;
    public abstract put(req: Request, res: Response): Promise<void>;
}
