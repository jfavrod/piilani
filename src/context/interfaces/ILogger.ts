export type LogLevel = 'debug' | 'error' | 'fatal' | 'info' | 'warn';

export interface ILogger {
    debug(mesg?: string): void;
    error(mesg?: string): void;
    info(mesg?: string): void;
    log(level: LogLevel, mesg?: string): void;
    warn(mesg?: string): void;
}
