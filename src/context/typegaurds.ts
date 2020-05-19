export function isIService(obj: any) {
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
}
