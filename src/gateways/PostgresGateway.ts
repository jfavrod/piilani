import { Pool } from 'pg';
import { ILogger } from '../context/interfaces';
import GatewayBase from './GatewayBase';

export default abstract class PostgresGateway<Query, Model> extends GatewayBase<Query, Model> {
  protected pool: Pool;

  constructor(pgPool: Pool, tablename: string, logger: ILogger) {
    super(tablename, logger);
    this.pool = pgPool;
  }
}
