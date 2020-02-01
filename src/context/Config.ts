import { DBDriver, Env } from './enums';
import { IConfig, IConfigValues, IDatabaseVals, IMultiDatabaseVals } from './interfaces';

export default class Config implements IConfig {
    private configValues: IConfigValues;
    private env: Env;

    constructor(configValues: IConfigValues, env: Env) {
        this.configValues = configValues;
        this.env = env;
    }

    public getConnectionString = (db?: string) => {
        let connString: string;

        if (db) {
            return (this.configValues.database as IMultiDatabaseVals)[db].toString();
        }
        else {
            if (this.configValues.database?.driver === DBDriver.pg) {
                connString = 'postgresql://';
                connString += this.configValues.database.user;
                connString += ':' + this.configValues.database.password;
                connString += '@' + this.configValues.database.host;
                connString += ':' + this.configValues.database.port || '5432';
                connString += '/' + this.configValues.database.name;
                return connString;
            }

            return (this.configValues.database as IDatabaseVals).toString();
        }
    }

    public getEnv = () => {
        return this.env;
    }

    public getListenPort = () => {
        return this.configValues.listenPort;
    }

    public getServiceConfig = (serviceName: string) => {
        if (this.configValues.services && Object.keys(this.configValues.services).includes(serviceName)) {
            return this.configValues.services[serviceName];
        }
    }

    public getServiceUrl = (serviceName: string): string | undefined => {
        if (this.configValues.services
            && Object.keys(this.configValues.services).includes(serviceName)
            && this.configValues.services[serviceName].url) {
            return this.configValues.services[serviceName].url;
        }
    }

    public toString = () => {
        return JSON.stringify(this.configValues, null, 2);
    }
}
