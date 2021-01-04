/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

export const isIConfig = (obj: any): boolean => {
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
};
