import { Pool } from 'pg';
import { ILogger } from '../../context/interfaces';
import GatewayBase from './GatewayBase';

export default abstract class PostgresGateway extends GatewayBase {
    protected pool: Pool;

    constructor(pgPool: Pool, logger?: ILogger) {
        super(logger);
        this.pool = pgPool;
    }
}
