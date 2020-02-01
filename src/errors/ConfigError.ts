export default class ConfigError extends Error {
    public readonly name = 'ConfigError';

    constructor(mesg?: string) {
        super(mesg);
    }
}
