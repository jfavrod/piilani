import { Request, Response } from 'express';
 /**
  * Common interfaces for Services classes (Services).
  */

export interface IHttpRouter {
    delete(...params: any): Promise<any>;
    get(...params: any): Promise<any>;
    post(...params: any): Promise<any>;
    put(...params: any): Promise<any>;
}

export interface IHttpExpressRouter {
    delete(req: Request, res: Response, next: (...params: any) => any): Promise<void>;
    get(req: Request, res: Response, next: (...params: any) => any): Promise<void>;
    post(req: Request, res: Response, next: (...params: any) => any): Promise<void>;
    put(req: Request, res: Response, next: (...params: any) => any): Promise<void>;
}
