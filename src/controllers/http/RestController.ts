import { restController } from '../../decorators/restful'
import MetaData from '../../decorators/MetaData';
import { BaseController } from '../BaseController';

const md = new MetaData<RestController>();

@restController(md)
export class RestController extends BaseController {
    public constructor () {
        super();
        console.log(this.constructor.name, 'adding ref', this)
        md.addRef(this.constructor.name, this);
    }
}
