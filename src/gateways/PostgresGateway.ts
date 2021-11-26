import { Pool } from 'pg';
import { ILogger } from '../context/interfaces';
import GatewayBase from './GatewayBase';

export default abstract class PostgresGateway<E, Q> extends GatewayBase<E, Q> {
    protected pool: Pool;

    constructor(pgPool: Pool, tablename: string, logger: ILogger) {
        super(tablename, logger);
        this.pool = pgPool;
    }
}
