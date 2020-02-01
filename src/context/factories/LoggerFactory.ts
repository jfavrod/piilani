import { ILogger } from '../interfaces';

export default class LoggerFactory {
    public static getInstance(): ILogger {
        return console;
    }
}
