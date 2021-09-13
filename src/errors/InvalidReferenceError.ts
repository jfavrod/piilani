/**
 * @packageDocumentation
 * @module Errors
 */

/**
 * Used when the referenced object is not the expected type.
 */
export default class InvalidReferenceError extends Error {
    public readonly name = 'InvalidReferenceError';

    public constructor(mesg?: string) {
        super(mesg);
    }
}
