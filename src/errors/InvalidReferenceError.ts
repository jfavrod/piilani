/**
 * Used when the referenced object is not the expected type.
 */
export default class InvalidReferenceError extends Error {
    public readonly name = 'InvalidReferenceError';

    constructor(mesg?: string) {
        super(mesg);
    }
}
