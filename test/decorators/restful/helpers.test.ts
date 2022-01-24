// import * as restful from '../../decorators/restful'
import * as helpers from '../../../decorators/restful/helpers'

helpers.parsePath('/my/route/{param2}/{param1}');
helpers.parsePath('/my/{param2}/route/{param1}');
