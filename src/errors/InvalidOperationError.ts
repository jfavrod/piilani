/**
 * Used in cases when the failure to invoke a method is caused by
 * reasons other than invalid arguments.
 */
export default class InvalidOperationError extends Error {
    public readonly name = 'InvalidOperationError';

    constructor(mesg?: string) {
        super(mesg);
    }
}
