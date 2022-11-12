import { MongoClient } from 'mongodb';

import { ILogger } from '../context';
import GatewayBase from './GatewayBase';
import { IMongoGatewayConfig } from './IMongoGatewayConfig';

export abstract class MongoGateway<Entity> extends GatewayBase<Entity> {
  protected client: MongoClient;
  protected config: IMongoGatewayConfig;

  public constructor(client: MongoClient, config: IMongoGatewayConfig, logger: ILogger) {
    super(config.collection, logger);
    this.client = client;
    this.config = config;
  }
}
