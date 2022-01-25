import http, { Server } from 'http'
import FactoryBase from './FactoryBase'

import ConfigFactory from './ConfigFactory'

export default class ServiceFactory extends FactoryBase {
    private static config = ConfigFactory.getInstance()
    private static server: Server

    public static getHttpServer(): Server {
        if (!ServiceFactory.server) {
            ServiceFactory.server = http.createServer()
            ServiceFactory.server.listen(this.config.getListenPort())
        }
        return ServiceFactory.server
    }
}
