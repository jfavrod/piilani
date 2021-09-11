import SQLite3, { Database } from 'better-sqlite3';

import { ILogger } from '../../context/interfaces';
import { IGatewayResponse, ITableDataGateway } from './interfaces';
import GatewayBase from './GatewayBase';

export default abstract class SQLiteGateway extends GatewayBase implements ITableDataGateway {
    public readonly table: string;

    private dbFile: string;

    constructor(dbFile: string, table: string, logger?: ILogger) {
        super(logger);
        this.dbFile = dbFile;
        this.table = table;
        this.logger = logger || console as ILogger;

        this.getConnection = this.getConnection.bind(this);
        this.delete = this.delete.bind(this);
        this.find = this.find.bind(this);
        this.insert = this.insert.bind(this);
        this.update = this.update.bind(this);
    }

    protected getConnection(): Database {
        return new SQLite3(this.dbFile);
    }

    public abstract delete(id: number): Promise<IGatewayResponse>;
    public abstract find(query?: any): Promise<IGatewayResponse>;
    public abstract insert(record: any): Promise<IGatewayResponse>;
    public abstract update(record: any): Promise<IGatewayResponse>;
}
