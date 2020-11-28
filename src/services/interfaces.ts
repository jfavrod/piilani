import { Request, Response } from 'express';

/**
 * @packageDocumentation
 * @module Services
 */

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

/** An Identity and Access Management (IAM) service interface */
export interface IIAMService {
    /**
     * The resources who's access is controlled by this service
     * (e.g. "AWS" resources such as s3, RDS, etc.).
     */
    resources: string;
    /** Get a token to access some resource. */
    getAccessToken(...params: any): any;
    /** Use to require authentication to some resource (e.g. an endpoint). */
    requireAuthentication(...params: any): any;
}

export interface IServiceResponse {
    /**
     * A response code; usually follows HTTP response code conventions.
     * E.g. 200 OK, 400 Bad Request, 500 Internal Server Error.
     */
    code: number;
    data?: any;
    error: boolean;
    message?: string;
}
