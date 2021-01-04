/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

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
