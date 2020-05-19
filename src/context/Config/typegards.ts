import * as IFace from './interfaces';

export function isIConfig(obj: any): boolean {
    const functions = [
        'getConfigDir',
        'getConnectionString',
        'getDatabaseConfig',
        'getEnv',
        'getListenPort',
        'getLoggingConfig',
        'getServiceConfig',
        'getServiceUrl',
        'toString',
    ];

    let validation = true;

    for (const func of functions) {
        if (!obj.hasOwnProperty(func) || typeof(obj[func]) !== 'function') {
            validation = false;
            break;
        }
    }

    return validation;
}
