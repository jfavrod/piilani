import express from 'express';
import cors from 'cors';

import FactoryBase from './FactoryBase'
import ConfigFactory from './ConfigFactory'

const config = ConfigFactory.getInstance();

export default class ServiceFactory extends FactoryBase {
    private static httpServer: express.Express;

    public static getHttpServer(): express.Express {
        if (!ServiceFactory.httpServer) {
            const app = express();
            app.use(cors());
            app.listen(config.getListenPort() || 3000);

            ServiceFactory.httpServer = app;
        }

        return ServiceFactory.httpServer;
    }
}
