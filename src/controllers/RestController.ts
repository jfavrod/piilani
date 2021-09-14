import { restController } from './annotations'
import NotImplementedError from '../errors/NotImplementedError'

import ControllerBase from './ControllerBase'
import { MetaData } from '../context';

const md = new MetaData<RestController>();

@restController(md)
export default class RestController extends ControllerBase {

    public constructor () {
        super();
        this.delete = this.delete.bind(this);
        this.get = this.get.bind(this);
        this.post = this.post.bind(this);
        this.put = this.put.bind(this);
        md.addRef(this.constructor.name, this);
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
