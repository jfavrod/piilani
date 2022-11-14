import appRoot from 'app-root-path';
import { readFileSync } from 'fs';
import http, { Server } from 'http';
import https from 'https';
import { ISslConfig } from '../interfaces/Config';
import ConfigFactory from './ConfigFactory';
import FactoryBase from './FactoryBase';

export default class ServiceFactory extends FactoryBase {
  private static config = ConfigFactory.getInstance();
  private static server: Server;

  public static getHttpServer(): Server {
    if (!ServiceFactory.server) {
      const serverConfig = ServiceFactory.config.getServerConfig();

      if (serverConfig.ssl) {
        ServiceFactory.server = ServiceFactory.secure({
          ssl: serverConfig.ssl,
          port: serverConfig.port
        });
      }
      else {
        ServiceFactory.server = ServiceFactory.insecure(serverConfig.port);
      }
    }

    return ServiceFactory.server;
  }

  private static insecure(port: number) {
    return http.createServer().listen(port);
  }

  private static secure(serverConfig: { ssl: ISslConfig; port: number; }) {
    const cert = readFileSync(`${appRoot}/${serverConfig.ssl.cert}`, 'utf-8');
    const key = readFileSync(`${appRoot}/${serverConfig.ssl.key}`, 'utf-8');

    const options: ISslConfig = { cert, key };

    if (serverConfig.ssl.ca) {
      options.ca = readFileSync(`${appRoot}/${serverConfig.ssl.ca}`, 'utf-8');
    }

    return https.createServer(options).listen(serverConfig.port);
  }
}
