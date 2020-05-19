/**
 * @packageDocumentation
 * @module Context.Factories.BaseClasses
 */

import fs from 'fs';
import { Pool } from 'pg';
import { IDatabaseVals } from '../../interfaces';
import FactoryBase from './FactoryBase';

/**
 * Base class for building new PostgresqlGateways.
 *
 * @example ```typescript
 * import PostgresqlGatewayFactory from './context/factories/baseClasses/PostgresqlGatewayFactoryBase';
 *
 * export default class MyPostgresqlGatewayFactory extends PostgresqlGatewayFactory {
 *     ...
 * }
 */
export default class PostgresqlGatewayFactoryBase extends FactoryBase {
    private pool: Pool | undefined;

    constructor() {
        super();
        this.disconnect = this.disconnect.bind(this);
        this.getPool = this.getPool.bind(this);
    }

    /**
     * End the Pool connection to the database.
     * Subsequent calls that return gateways should establish a new
     * connection Pool.
     */
    public async disconnect() {
        if (this.pool) {
            try {
                await this.pool.end();
                this.pool = undefined;
            }
            catch {
                return false;
            }
        }

        return true;
    }

    protected getPool(): Pool {
        if (!this.pool) {
            let dbConfig = this.config.getDatabaseConfig();
            let caFile: string | undefined;

            if (!(dbConfig instanceof Array)) {
                dbConfig = dbConfig as IDatabaseVals;
                if (dbConfig?.ssl && dbConfig.ssl!.ca) {
                    caFile = (dbConfig as IDatabaseVals).ssl!.ca!;
                }
            }

            if (caFile) {
                return new Pool({
                    connectionString: this.config.getConnectionString(),
                    ssl: {
                        ca: fs.readFileSync(`${this.config.getConfigDir()}/${caFile}`),
                        rejectUnauthorized: false,
                    },
                });
            }

            this.pool = new Pool({ connectionString: this.config.getConnectionString() });
        }

        return this.pool;
    }
}
