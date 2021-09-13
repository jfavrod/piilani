import { Request, Response } from 'express';
import { IHttpExpressRouter } from './interfaces';

export default interface IExpressRouter extends IHttpExpressRouter {
    delete(req: Request, res: Response): Promise<void>;
    get(req: Request, res: Response): Promise<void>;
    post(req: Request, res: Response): Promise<void>;
    put(req: Request, res: Response): Promise<void>;
}
