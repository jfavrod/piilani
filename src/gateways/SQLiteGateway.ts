import SQLite3, { Database } from 'better-sqlite3';

import { ILogger } from '../context/interfaces';
import GatewayBase from './GatewayBase';

export default abstract class SQLiteGateway<E, Q> extends GatewayBase<E, Q> {
    public readonly table: string;

    private dbFile: string;

    constructor(dbFile: string, table: string, logger: ILogger) {
        super(table, logger);
        this.dbFile = dbFile;
        this.table = table;
    }

    protected getConnection(): Database {
        return new SQLite3(this.dbFile);
    }
}
