import { Express, Request, Response } from 'express'
import { runInThisContext } from 'vm';
import { ILogger } from '../context'
import NotImplementedError from '../errors/NotImplementedError'

import ControllerBase from './ControllerBase'

export default class RestController extends ControllerBase {
    public constructor () {
        super();
        this.delete = this.delete.bind(this);
        this.get = this.get.bind(this);
        this.post = this.post.bind(this);
        this.put = this.put.bind(this);
    }

    public delete(params: any): any {
        throw new NotImplementedError();
    }

    public get(...params: any): any {
        throw new NotImplementedError();
    }

    public post(params: any): any {
        throw new NotImplementedError();
    }

    public put(params: any): any {
        throw new NotImplementedError();
    }
}
