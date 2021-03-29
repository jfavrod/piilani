/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

/**
 * @deprecated
 */
export const isIService = (obj: any): boolean => {
    const props = [
        'cert',
        'clientId',
        'clientService',
        'url',
        'urls',
    ];

    let bool = false;

    for (const prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            if (props.includes(prop)) {
                bool = true;
            }
        }
    }

    return bool;
};

export const isILogger = (obj: any): boolean => {
    let bool = true;

    [
        'debug', 'error', 'info', 'log', 'warn',
    ]
    .forEach((prop) => {
        if (!obj.hasOwnProperty(prop)) {
            bool = false;
        }
    });

    return bool;
};
