import fs from 'fs';
import { Pool } from 'pg';
import { IConfig, IDatabaseVals } from '../../interfaces';
import FactoryBase from './FactoryBase';

export default class PostgresqlGatewayFactoryBase extends FactoryBase {
    protected getPool = (config: IConfig): Pool => {
        let dbConfig = config.getDatabaseConfig();
        let caFile: string | undefined;

        if (!(dbConfig instanceof Array)) {
            dbConfig = dbConfig as IDatabaseVals;
            if (dbConfig?.ssl && dbConfig.ssl!.ca) {
                caFile = (dbConfig as IDatabaseVals).ssl!.ca!;
            }
        }

        if (caFile) {
            return new Pool({
                connectionString: config.getConnectionString(),
                ssl: {
                    ca: fs.readFileSync(`${config.getConfigDir()}/${caFile}`),
                    rejectUnauthorized: false,
                },
            });
        }

        return new Pool({ connectionString: config.getConnectionString() });
    }
}
